/**
 * Petal Card did not supply functionality to export transactions as a csv
 * so I had to create this file to clean up text scraped from website.
 */
import path from 'path'
import fs from 'fs'
import moment from 'moment'

const outPath = path.resolve(__dirname, 'petal.csv')
const filePath = path.resolve(__dirname, 'petal.txt')
const headers = ['Price', 'Date', 'Description']
const transactions = fs.readFileSync(filePath, 'utf-8')

// Create file
fs.writeFileSync(outPath, `${headers.join(',')}\n`)

transactions
  .split('\n')
  .map((transaction) => {
    const splitData = transaction.split(' ')
    const lastIndex = splitData.length - 1

    try {
      const price = parseFloat(splitData[lastIndex].replace('$', '')).toFixed(2)
      const date = moment(new Date(splitData[0])).toJSON()
      const description = splitData.slice(2, lastIndex).join(' ')

      // Append to file
      fs.appendFileSync(outPath, `${price}, ${date}, ${description}\n`)
    } catch (err) {
      console.log(splitData)
    }
  })
