import {Command, flags} from '@oclif/command'
import fs = require('fs')
import moment = require('moment')
import os = require('os')
import path = require('path')
import xlsx = require('xlsx')

export default class AmexConvert extends Command {
  static description = 'Convert an American Express `Summary.xls` to a `.csv`'

  static examples = [
    '$ budgeteer-cli amex-convert --file ~/downloads/Summary.xlsx',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    file: flags.string({
      char: 'f',
      description: 'American Express `Summary.xls` to convert',
      required: true,
    }),
  }

  static args = [{name: 'file'}]

  getValue(value: any, columnNumber: number, nextCell: any) {
    const lineBreakCheck = /(\r\n|\r|\n)/g

    switch (columnNumber) {
    case 0: // `Date`
      return value
    case 1: // `Date Processed`
      return moment(new Date(value)).format('YYYY-MM-DD')
    case 3: // `Amount`
      return  -(nextCell.w.replace('£', '').replace(',', ''))
    default:
      return typeof value === 'string' ? value.replace(lineBreakCheck, '   -   ') : value
    }
  }

  convertSheet2Array(sheet: xlsx.WorkSheet) {
    const result = []
    let row
    let rowNum
    let colNum
    const range = xlsx.utils.decode_range(sheet['!ref'] || '')
    let transactionsStartRow = 0
    let startSaving = false

    for (rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
      row = []

      for (colNum = range.s.c; colNum <= range.e.c; colNum++) {
        const nextCell = sheet[xlsx.utils.encode_cell({r: rowNum, c: colNum})]

        if (startSaving === false) {
          startSaving = nextCell ? nextCell.w === 'Date' : false
        }

        if (startSaving) {
          let {w: value} = nextCell || {w: ''}

          if (value === 'Date') {
            transactionsStartRow = rowNum + 1
          }

          if (rowNum >= transactionsStartRow) {
            value = this.getValue(value, colNum, nextCell)
          }

          row.push(value)
        }
      }

      if (startSaving) result.push(row.join(','))
    }

    return result
  }

  async run() {
    const {flags} = this.parse(AmexConvert)
    const filePath = path.resolve(flags.file.replace('~', os.homedir()))
    const workbook = xlsx.readFile(filePath)
    const worksheet = workbook.Sheets.Summary

    const savePath = path.join(__dirname, 'summary.csv')

    fs.writeFileSync(savePath, this.convertSheet2Array(worksheet).join('\n'))

    this.log(`File saved to ${savePath}`)
  }
}
