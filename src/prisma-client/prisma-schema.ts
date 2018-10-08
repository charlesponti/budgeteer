export const typeDefs = /* GraphQL */ `type Account {
  id: ID!
  name: String!
  balance: Float!
  transactions(where: TransactionWhereInput, orderBy: TransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Transaction!]
}

type AccountConnection {
  pageInfo: PageInfo!
  edges: [AccountEdge]!
  aggregate: AggregateAccount!
}

input AccountCreateInput {
  name: String!
  balance: Float!
  transactions: TransactionCreateManyInput
}

input AccountCreateManyInput {
  create: [AccountCreateInput!]
  connect: [AccountWhereUniqueInput!]
}

type AccountEdge {
  node: Account!
  cursor: String!
}

enum AccountOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  balance_ASC
  balance_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AccountPreviousValues {
  id: ID!
  name: String!
  balance: Float!
}

type AccountSubscriptionPayload {
  mutation: MutationType!
  node: Account
  updatedFields: [String!]
  previousValues: AccountPreviousValues
}

input AccountSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AccountWhereInput
  AND: [AccountSubscriptionWhereInput!]
  OR: [AccountSubscriptionWhereInput!]
  NOT: [AccountSubscriptionWhereInput!]
}

input AccountUpdateDataInput {
  name: String
  balance: Float
  transactions: TransactionUpdateManyInput
}

input AccountUpdateInput {
  name: String
  balance: Float
  transactions: TransactionUpdateManyInput
}

input AccountUpdateManyInput {
  create: [AccountCreateInput!]
  delete: [AccountWhereUniqueInput!]
  connect: [AccountWhereUniqueInput!]
  disconnect: [AccountWhereUniqueInput!]
  update: [AccountUpdateWithWhereUniqueNestedInput!]
  upsert: [AccountUpsertWithWhereUniqueNestedInput!]
}

input AccountUpdateWithWhereUniqueNestedInput {
  where: AccountWhereUniqueInput!
  data: AccountUpdateDataInput!
}

input AccountUpsertWithWhereUniqueNestedInput {
  where: AccountWhereUniqueInput!
  update: AccountUpdateDataInput!
  create: AccountCreateInput!
}

input AccountWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  balance: Float
  balance_not: Float
  balance_in: [Float!]
  balance_not_in: [Float!]
  balance_lt: Float
  balance_lte: Float
  balance_gt: Float
  balance_gte: Float
  transactions_every: TransactionWhereInput
  transactions_some: TransactionWhereInput
  transactions_none: TransactionWhereInput
  AND: [AccountWhereInput!]
  OR: [AccountWhereInput!]
  NOT: [AccountWhereInput!]
}

input AccountWhereUniqueInput {
  id: ID
}

type AggregateAccount {
  count: Int!
}

type AggregateBook {
  count: Int!
}

type AggregateBookTransaction {
  count: Int!
}

type AggregateBudget {
  count: Int!
}

type AggregateContactInfo {
  count: Int!
}

type AggregateCourse {
  count: Int!
}

type AggregateCourseAssignment {
  count: Int!
}

type AggregateCourseLecture {
  count: Int!
}

type AggregateEducation {
  count: Int!
}

type AggregateEvent {
  count: Int!
}

type AggregateFavorite {
  count: Int!
}

type AggregateFinanceGoals {
  count: Int!
}

type AggregateFixedCost {
  count: Int!
}

type AggregateGoodOrService {
  count: Int!
}

type AggregateHuman {
  count: Int!
}

type AggregateLocation {
  count: Int!
}

type AggregateMovie {
  count: Int!
}

type AggregateMovieTransaction {
  count: Int!
}

type AggregateOverview {
  count: Int!
}

type AggregateSchool {
  count: Int!
}

type AggregateTask {
  count: Int!
}

type AggregateTimeline {
  count: Int!
}

type AggregateTransaction {
  count: Int!
}

type AggregateTransactionSplit {
  count: Int!
}

type AggregateTvEpisode {
  count: Int!
}

type AggregateTvEpisodeTransaction {
  count: Int!
}

type AggregateTvShow {
  count: Int!
}

type AggregateWeightHistoryItem {
  count: Int!
}

type AggregateWishList {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Book {
  id: ID!
  name: String
  author: String
  release_date: DateTime!
  word_count: Int
}

type BookConnection {
  pageInfo: PageInfo!
  edges: [BookEdge]!
  aggregate: AggregateBook!
}

input BookCreateInput {
  name: String
  author: String
  release_date: DateTime!
  word_count: Int
}

input BookCreateOneInput {
  create: BookCreateInput
  connect: BookWhereUniqueInput
}

type BookEdge {
  node: Book!
  cursor: String!
}

enum BookOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  author_ASC
  author_DESC
  release_date_ASC
  release_date_DESC
  word_count_ASC
  word_count_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type BookPreviousValues {
  id: ID!
  name: String
  author: String
  release_date: DateTime!
  word_count: Int
}

type BookSubscriptionPayload {
  mutation: MutationType!
  node: Book
  updatedFields: [String!]
  previousValues: BookPreviousValues
}

input BookSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: BookWhereInput
  AND: [BookSubscriptionWhereInput!]
  OR: [BookSubscriptionWhereInput!]
  NOT: [BookSubscriptionWhereInput!]
}

type BookTransaction {
  id: ID!
  book: Book
  date_started: DateTime
  date_finished: DateTime
}

type BookTransactionConnection {
  pageInfo: PageInfo!
  edges: [BookTransactionEdge]!
  aggregate: AggregateBookTransaction!
}

input BookTransactionCreateInput {
  book: BookCreateOneInput
  date_started: DateTime
  date_finished: DateTime
}

input BookTransactionCreateManyInput {
  create: [BookTransactionCreateInput!]
  connect: [BookTransactionWhereUniqueInput!]
}

type BookTransactionEdge {
  node: BookTransaction!
  cursor: String!
}

enum BookTransactionOrderByInput {
  id_ASC
  id_DESC
  date_started_ASC
  date_started_DESC
  date_finished_ASC
  date_finished_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type BookTransactionPreviousValues {
  id: ID!
  date_started: DateTime
  date_finished: DateTime
}

type BookTransactionSubscriptionPayload {
  mutation: MutationType!
  node: BookTransaction
  updatedFields: [String!]
  previousValues: BookTransactionPreviousValues
}

input BookTransactionSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: BookTransactionWhereInput
  AND: [BookTransactionSubscriptionWhereInput!]
  OR: [BookTransactionSubscriptionWhereInput!]
  NOT: [BookTransactionSubscriptionWhereInput!]
}

input BookTransactionUpdateDataInput {
  book: BookUpdateOneInput
  date_started: DateTime
  date_finished: DateTime
}

input BookTransactionUpdateInput {
  book: BookUpdateOneInput
  date_started: DateTime
  date_finished: DateTime
}

input BookTransactionUpdateManyInput {
  create: [BookTransactionCreateInput!]
  delete: [BookTransactionWhereUniqueInput!]
  connect: [BookTransactionWhereUniqueInput!]
  disconnect: [BookTransactionWhereUniqueInput!]
  update: [BookTransactionUpdateWithWhereUniqueNestedInput!]
  upsert: [BookTransactionUpsertWithWhereUniqueNestedInput!]
}

input BookTransactionUpdateWithWhereUniqueNestedInput {
  where: BookTransactionWhereUniqueInput!
  data: BookTransactionUpdateDataInput!
}

input BookTransactionUpsertWithWhereUniqueNestedInput {
  where: BookTransactionWhereUniqueInput!
  update: BookTransactionUpdateDataInput!
  create: BookTransactionCreateInput!
}

input BookTransactionWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  book: BookWhereInput
  date_started: DateTime
  date_started_not: DateTime
  date_started_in: [DateTime!]
  date_started_not_in: [DateTime!]
  date_started_lt: DateTime
  date_started_lte: DateTime
  date_started_gt: DateTime
  date_started_gte: DateTime
  date_finished: DateTime
  date_finished_not: DateTime
  date_finished_in: [DateTime!]
  date_finished_not_in: [DateTime!]
  date_finished_lt: DateTime
  date_finished_lte: DateTime
  date_finished_gt: DateTime
  date_finished_gte: DateTime
  AND: [BookTransactionWhereInput!]
  OR: [BookTransactionWhereInput!]
  NOT: [BookTransactionWhereInput!]
}

input BookTransactionWhereUniqueInput {
  id: ID
}

input BookUpdateDataInput {
  name: String
  author: String
  release_date: DateTime
  word_count: Int
}

input BookUpdateInput {
  name: String
  author: String
  release_date: DateTime
  word_count: Int
}

input BookUpdateOneInput {
  create: BookCreateInput
  update: BookUpdateDataInput
  upsert: BookUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: BookWhereUniqueInput
}

input BookUpsertNestedInput {
  update: BookUpdateDataInput!
  create: BookCreateInput!
}

input BookWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  author: String
  author_not: String
  author_in: [String!]
  author_not_in: [String!]
  author_lt: String
  author_lte: String
  author_gt: String
  author_gte: String
  author_contains: String
  author_not_contains: String
  author_starts_with: String
  author_not_starts_with: String
  author_ends_with: String
  author_not_ends_with: String
  release_date: DateTime
  release_date_not: DateTime
  release_date_in: [DateTime!]
  release_date_not_in: [DateTime!]
  release_date_lt: DateTime
  release_date_lte: DateTime
  release_date_gt: DateTime
  release_date_gte: DateTime
  word_count: Int
  word_count_not: Int
  word_count_in: [Int!]
  word_count_not_in: [Int!]
  word_count_lt: Int
  word_count_lte: Int
  word_count_gt: Int
  word_count_gte: Int
  AND: [BookWhereInput!]
  OR: [BookWhereInput!]
  NOT: [BookWhereInput!]
}

input BookWhereUniqueInput {
  id: ID
}

type Budget {
  id: ID!
  flexible_spending: Float
  total_fixed_cost: Float
  fixed_costs(where: FixedCostWhereInput, orderBy: FixedCostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [FixedCost!]
}

type BudgetConnection {
  pageInfo: PageInfo!
  edges: [BudgetEdge]!
  aggregate: AggregateBudget!
}

input BudgetCreateInput {
  flexible_spending: Float
  total_fixed_cost: Float
  fixed_costs: FixedCostCreateManyInput
}

input BudgetCreateOneInput {
  create: BudgetCreateInput
  connect: BudgetWhereUniqueInput
}

type BudgetEdge {
  node: Budget!
  cursor: String!
}

enum BudgetOrderByInput {
  id_ASC
  id_DESC
  flexible_spending_ASC
  flexible_spending_DESC
  total_fixed_cost_ASC
  total_fixed_cost_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type BudgetPreviousValues {
  id: ID!
  flexible_spending: Float
  total_fixed_cost: Float
}

type BudgetSubscriptionPayload {
  mutation: MutationType!
  node: Budget
  updatedFields: [String!]
  previousValues: BudgetPreviousValues
}

input BudgetSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: BudgetWhereInput
  AND: [BudgetSubscriptionWhereInput!]
  OR: [BudgetSubscriptionWhereInput!]
  NOT: [BudgetSubscriptionWhereInput!]
}

input BudgetUpdateDataInput {
  flexible_spending: Float
  total_fixed_cost: Float
  fixed_costs: FixedCostUpdateManyInput
}

input BudgetUpdateInput {
  flexible_spending: Float
  total_fixed_cost: Float
  fixed_costs: FixedCostUpdateManyInput
}

input BudgetUpdateOneInput {
  create: BudgetCreateInput
  update: BudgetUpdateDataInput
  upsert: BudgetUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: BudgetWhereUniqueInput
}

input BudgetUpsertNestedInput {
  update: BudgetUpdateDataInput!
  create: BudgetCreateInput!
}

input BudgetWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  flexible_spending: Float
  flexible_spending_not: Float
  flexible_spending_in: [Float!]
  flexible_spending_not_in: [Float!]
  flexible_spending_lt: Float
  flexible_spending_lte: Float
  flexible_spending_gt: Float
  flexible_spending_gte: Float
  total_fixed_cost: Float
  total_fixed_cost_not: Float
  total_fixed_cost_in: [Float!]
  total_fixed_cost_not_in: [Float!]
  total_fixed_cost_lt: Float
  total_fixed_cost_lte: Float
  total_fixed_cost_gt: Float
  total_fixed_cost_gte: Float
  fixed_costs_every: FixedCostWhereInput
  fixed_costs_some: FixedCostWhereInput
  fixed_costs_none: FixedCostWhereInput
  AND: [BudgetWhereInput!]
  OR: [BudgetWhereInput!]
  NOT: [BudgetWhereInput!]
}

input BudgetWhereUniqueInput {
  id: ID
}

type ContactInfo {
  email: String
  phone_number: String
  twitter: String
  snapchat: String
  human: Human!
}

type ContactInfoConnection {
  pageInfo: PageInfo!
  edges: [ContactInfoEdge]!
  aggregate: AggregateContactInfo!
}

input ContactInfoCreateInput {
  email: String
  phone_number: String
  twitter: String
  snapchat: String
  human: HumanCreateOneWithoutContactInput!
}

input ContactInfoCreateOneWithoutHumanInput {
  create: ContactInfoCreateWithoutHumanInput
}

input ContactInfoCreateWithoutHumanInput {
  email: String
  phone_number: String
  twitter: String
  snapchat: String
}

type ContactInfoEdge {
  node: ContactInfo!
  cursor: String!
}

enum ContactInfoOrderByInput {
  email_ASC
  email_DESC
  phone_number_ASC
  phone_number_DESC
  twitter_ASC
  twitter_DESC
  snapchat_ASC
  snapchat_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ContactInfoPreviousValues {
  email: String
  phone_number: String
  twitter: String
  snapchat: String
}

type ContactInfoSubscriptionPayload {
  mutation: MutationType!
  node: ContactInfo
  updatedFields: [String!]
  previousValues: ContactInfoPreviousValues
}

input ContactInfoSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ContactInfoWhereInput
  AND: [ContactInfoSubscriptionWhereInput!]
  OR: [ContactInfoSubscriptionWhereInput!]
  NOT: [ContactInfoSubscriptionWhereInput!]
}

input ContactInfoUpdateInput {
  email: String
  phone_number: String
  twitter: String
  snapchat: String
  human: HumanUpdateOneRequiredWithoutContactInput
}

input ContactInfoUpdateOneWithoutHumanInput {
  create: ContactInfoCreateWithoutHumanInput
  update: ContactInfoUpdateWithoutHumanDataInput
  upsert: ContactInfoUpsertWithoutHumanInput
  delete: Boolean
  disconnect: Boolean
}

input ContactInfoUpdateWithoutHumanDataInput {
  email: String
  phone_number: String
  twitter: String
  snapchat: String
}

input ContactInfoUpsertWithoutHumanInput {
  update: ContactInfoUpdateWithoutHumanDataInput!
  create: ContactInfoCreateWithoutHumanInput!
}

input ContactInfoWhereInput {
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  phone_number: String
  phone_number_not: String
  phone_number_in: [String!]
  phone_number_not_in: [String!]
  phone_number_lt: String
  phone_number_lte: String
  phone_number_gt: String
  phone_number_gte: String
  phone_number_contains: String
  phone_number_not_contains: String
  phone_number_starts_with: String
  phone_number_not_starts_with: String
  phone_number_ends_with: String
  phone_number_not_ends_with: String
  twitter: String
  twitter_not: String
  twitter_in: [String!]
  twitter_not_in: [String!]
  twitter_lt: String
  twitter_lte: String
  twitter_gt: String
  twitter_gte: String
  twitter_contains: String
  twitter_not_contains: String
  twitter_starts_with: String
  twitter_not_starts_with: String
  twitter_ends_with: String
  twitter_not_ends_with: String
  snapchat: String
  snapchat_not: String
  snapchat_in: [String!]
  snapchat_not_in: [String!]
  snapchat_lt: String
  snapchat_lte: String
  snapchat_gt: String
  snapchat_gte: String
  snapchat_contains: String
  snapchat_not_contains: String
  snapchat_starts_with: String
  snapchat_not_starts_with: String
  snapchat_ends_with: String
  snapchat_not_ends_with: String
  human: HumanWhereInput
  AND: [ContactInfoWhereInput!]
  OR: [ContactInfoWhereInput!]
  NOT: [ContactInfoWhereInput!]
}

type Course {
  name: String
  subject: ID!
  completion: Float!
  start_date: DateTime!
  end_date: DateTime!
  lectures(where: CourseLectureWhereInput, orderBy: CourseLectureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [CourseLecture!]
  assignments(where: CourseAssignmentWhereInput, orderBy: CourseAssignmentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [CourseAssignment!]
  school: School!
}

type CourseAssignment {
  id: ID!
  description: String!
  grade: Float
  course: Course!
}

type CourseAssignmentConnection {
  pageInfo: PageInfo!
  edges: [CourseAssignmentEdge]!
  aggregate: AggregateCourseAssignment!
}

input CourseAssignmentCreateInput {
  description: String!
  grade: Float
  course: CourseCreateOneWithoutAssignmentsInput!
}

input CourseAssignmentCreateManyWithoutCourseInput {
  create: [CourseAssignmentCreateWithoutCourseInput!]
  connect: [CourseAssignmentWhereUniqueInput!]
}

input CourseAssignmentCreateWithoutCourseInput {
  description: String!
  grade: Float
}

type CourseAssignmentEdge {
  node: CourseAssignment!
  cursor: String!
}

enum CourseAssignmentOrderByInput {
  id_ASC
  id_DESC
  description_ASC
  description_DESC
  grade_ASC
  grade_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CourseAssignmentPreviousValues {
  id: ID!
  description: String!
  grade: Float
}

type CourseAssignmentSubscriptionPayload {
  mutation: MutationType!
  node: CourseAssignment
  updatedFields: [String!]
  previousValues: CourseAssignmentPreviousValues
}

input CourseAssignmentSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CourseAssignmentWhereInput
  AND: [CourseAssignmentSubscriptionWhereInput!]
  OR: [CourseAssignmentSubscriptionWhereInput!]
  NOT: [CourseAssignmentSubscriptionWhereInput!]
}

input CourseAssignmentUpdateInput {
  description: String
  grade: Float
  course: CourseUpdateOneRequiredWithoutAssignmentsInput
}

input CourseAssignmentUpdateManyWithoutCourseInput {
  create: [CourseAssignmentCreateWithoutCourseInput!]
  delete: [CourseAssignmentWhereUniqueInput!]
  connect: [CourseAssignmentWhereUniqueInput!]
  disconnect: [CourseAssignmentWhereUniqueInput!]
  update: [CourseAssignmentUpdateWithWhereUniqueWithoutCourseInput!]
  upsert: [CourseAssignmentUpsertWithWhereUniqueWithoutCourseInput!]
}

input CourseAssignmentUpdateWithoutCourseDataInput {
  description: String
  grade: Float
}

input CourseAssignmentUpdateWithWhereUniqueWithoutCourseInput {
  where: CourseAssignmentWhereUniqueInput!
  data: CourseAssignmentUpdateWithoutCourseDataInput!
}

input CourseAssignmentUpsertWithWhereUniqueWithoutCourseInput {
  where: CourseAssignmentWhereUniqueInput!
  update: CourseAssignmentUpdateWithoutCourseDataInput!
  create: CourseAssignmentCreateWithoutCourseInput!
}

input CourseAssignmentWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  grade: Float
  grade_not: Float
  grade_in: [Float!]
  grade_not_in: [Float!]
  grade_lt: Float
  grade_lte: Float
  grade_gt: Float
  grade_gte: Float
  course: CourseWhereInput
  AND: [CourseAssignmentWhereInput!]
  OR: [CourseAssignmentWhereInput!]
  NOT: [CourseAssignmentWhereInput!]
}

input CourseAssignmentWhereUniqueInput {
  id: ID
}

type CourseConnection {
  pageInfo: PageInfo!
  edges: [CourseEdge]!
  aggregate: AggregateCourse!
}

input CourseCreateInput {
  name: String
  subject: ID!
  completion: Float!
  start_date: DateTime!
  end_date: DateTime!
  lectures: CourseLectureCreateManyWithoutCourseInput
  assignments: CourseAssignmentCreateManyWithoutCourseInput
  school: SchoolCreateOneInput!
}

input CourseCreateManyInput {
  create: [CourseCreateInput!]
}

input CourseCreateOneWithoutAssignmentsInput {
  create: CourseCreateWithoutAssignmentsInput
}

input CourseCreateOneWithoutLecturesInput {
  create: CourseCreateWithoutLecturesInput
}

input CourseCreateWithoutAssignmentsInput {
  name: String
  subject: ID!
  completion: Float!
  start_date: DateTime!
  end_date: DateTime!
  lectures: CourseLectureCreateManyWithoutCourseInput
  school: SchoolCreateOneInput!
}

input CourseCreateWithoutLecturesInput {
  name: String
  subject: ID!
  completion: Float!
  start_date: DateTime!
  end_date: DateTime!
  assignments: CourseAssignmentCreateManyWithoutCourseInput
  school: SchoolCreateOneInput!
}

type CourseEdge {
  node: Course!
  cursor: String!
}

type CourseLecture {
  id: ID!
  title: String!
  description: String!
  course: Course!
}

type CourseLectureConnection {
  pageInfo: PageInfo!
  edges: [CourseLectureEdge]!
  aggregate: AggregateCourseLecture!
}

input CourseLectureCreateInput {
  title: String!
  description: String!
  course: CourseCreateOneWithoutLecturesInput!
}

input CourseLectureCreateManyWithoutCourseInput {
  create: [CourseLectureCreateWithoutCourseInput!]
  connect: [CourseLectureWhereUniqueInput!]
}

input CourseLectureCreateWithoutCourseInput {
  title: String!
  description: String!
}

type CourseLectureEdge {
  node: CourseLecture!
  cursor: String!
}

enum CourseLectureOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  description_ASC
  description_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CourseLecturePreviousValues {
  id: ID!
  title: String!
  description: String!
}

type CourseLectureSubscriptionPayload {
  mutation: MutationType!
  node: CourseLecture
  updatedFields: [String!]
  previousValues: CourseLecturePreviousValues
}

input CourseLectureSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CourseLectureWhereInput
  AND: [CourseLectureSubscriptionWhereInput!]
  OR: [CourseLectureSubscriptionWhereInput!]
  NOT: [CourseLectureSubscriptionWhereInput!]
}

input CourseLectureUpdateInput {
  title: String
  description: String
  course: CourseUpdateOneRequiredWithoutLecturesInput
}

input CourseLectureUpdateManyWithoutCourseInput {
  create: [CourseLectureCreateWithoutCourseInput!]
  delete: [CourseLectureWhereUniqueInput!]
  connect: [CourseLectureWhereUniqueInput!]
  disconnect: [CourseLectureWhereUniqueInput!]
  update: [CourseLectureUpdateWithWhereUniqueWithoutCourseInput!]
  upsert: [CourseLectureUpsertWithWhereUniqueWithoutCourseInput!]
}

input CourseLectureUpdateWithoutCourseDataInput {
  title: String
  description: String
}

input CourseLectureUpdateWithWhereUniqueWithoutCourseInput {
  where: CourseLectureWhereUniqueInput!
  data: CourseLectureUpdateWithoutCourseDataInput!
}

input CourseLectureUpsertWithWhereUniqueWithoutCourseInput {
  where: CourseLectureWhereUniqueInput!
  update: CourseLectureUpdateWithoutCourseDataInput!
  create: CourseLectureCreateWithoutCourseInput!
}

input CourseLectureWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  course: CourseWhereInput
  AND: [CourseLectureWhereInput!]
  OR: [CourseLectureWhereInput!]
  NOT: [CourseLectureWhereInput!]
}

input CourseLectureWhereUniqueInput {
  id: ID
}

enum CourseOrderByInput {
  name_ASC
  name_DESC
  subject_ASC
  subject_DESC
  completion_ASC
  completion_DESC
  start_date_ASC
  start_date_DESC
  end_date_ASC
  end_date_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CoursePreviousValues {
  name: String
  subject: ID!
  completion: Float!
  start_date: DateTime!
  end_date: DateTime!
}

type CourseSubscriptionPayload {
  mutation: MutationType!
  node: Course
  updatedFields: [String!]
  previousValues: CoursePreviousValues
}

input CourseSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CourseWhereInput
  AND: [CourseSubscriptionWhereInput!]
  OR: [CourseSubscriptionWhereInput!]
  NOT: [CourseSubscriptionWhereInput!]
}

input CourseUpdateInput {
  name: String
  subject: ID
  completion: Float
  start_date: DateTime
  end_date: DateTime
  lectures: CourseLectureUpdateManyWithoutCourseInput
  assignments: CourseAssignmentUpdateManyWithoutCourseInput
  school: SchoolUpdateOneRequiredInput
}

input CourseUpdateManyInput {
  create: [CourseCreateInput!]
}

input CourseUpdateOneRequiredWithoutAssignmentsInput {
  create: CourseCreateWithoutAssignmentsInput
  update: CourseUpdateWithoutAssignmentsDataInput
  upsert: CourseUpsertWithoutAssignmentsInput
}

input CourseUpdateOneRequiredWithoutLecturesInput {
  create: CourseCreateWithoutLecturesInput
  update: CourseUpdateWithoutLecturesDataInput
  upsert: CourseUpsertWithoutLecturesInput
}

input CourseUpdateWithoutAssignmentsDataInput {
  name: String
  subject: ID
  completion: Float
  start_date: DateTime
  end_date: DateTime
  lectures: CourseLectureUpdateManyWithoutCourseInput
  school: SchoolUpdateOneRequiredInput
}

input CourseUpdateWithoutLecturesDataInput {
  name: String
  subject: ID
  completion: Float
  start_date: DateTime
  end_date: DateTime
  assignments: CourseAssignmentUpdateManyWithoutCourseInput
  school: SchoolUpdateOneRequiredInput
}

input CourseUpsertWithoutAssignmentsInput {
  update: CourseUpdateWithoutAssignmentsDataInput!
  create: CourseCreateWithoutAssignmentsInput!
}

input CourseUpsertWithoutLecturesInput {
  update: CourseUpdateWithoutLecturesDataInput!
  create: CourseCreateWithoutLecturesInput!
}

input CourseWhereInput {
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  subject: ID
  subject_not: ID
  subject_in: [ID!]
  subject_not_in: [ID!]
  subject_lt: ID
  subject_lte: ID
  subject_gt: ID
  subject_gte: ID
  subject_contains: ID
  subject_not_contains: ID
  subject_starts_with: ID
  subject_not_starts_with: ID
  subject_ends_with: ID
  subject_not_ends_with: ID
  completion: Float
  completion_not: Float
  completion_in: [Float!]
  completion_not_in: [Float!]
  completion_lt: Float
  completion_lte: Float
  completion_gt: Float
  completion_gte: Float
  start_date: DateTime
  start_date_not: DateTime
  start_date_in: [DateTime!]
  start_date_not_in: [DateTime!]
  start_date_lt: DateTime
  start_date_lte: DateTime
  start_date_gt: DateTime
  start_date_gte: DateTime
  end_date: DateTime
  end_date_not: DateTime
  end_date_in: [DateTime!]
  end_date_not_in: [DateTime!]
  end_date_lt: DateTime
  end_date_lte: DateTime
  end_date_gt: DateTime
  end_date_gte: DateTime
  lectures_every: CourseLectureWhereInput
  lectures_some: CourseLectureWhereInput
  lectures_none: CourseLectureWhereInput
  assignments_every: CourseAssignmentWhereInput
  assignments_some: CourseAssignmentWhereInput
  assignments_none: CourseAssignmentWhereInput
  school: SchoolWhereInput
  AND: [CourseWhereInput!]
  OR: [CourseWhereInput!]
  NOT: [CourseWhereInput!]
}

scalar DateTime

type Education {
  id: ID!
  schools(where: SchoolWhereInput, orderBy: SchoolOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [School!]
  courses(where: CourseWhereInput, orderBy: CourseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Course!]
}

type EducationConnection {
  pageInfo: PageInfo!
  edges: [EducationEdge]!
  aggregate: AggregateEducation!
}

input EducationCreateInput {
  schools: SchoolCreateManyInput
  courses: CourseCreateManyInput
}

input EducationCreateOneInput {
  create: EducationCreateInput
  connect: EducationWhereUniqueInput
}

type EducationEdge {
  node: Education!
  cursor: String!
}

enum EducationOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type EducationPreviousValues {
  id: ID!
}

type EducationSubscriptionPayload {
  mutation: MutationType!
  node: Education
  updatedFields: [String!]
  previousValues: EducationPreviousValues
}

input EducationSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: EducationWhereInput
  AND: [EducationSubscriptionWhereInput!]
  OR: [EducationSubscriptionWhereInput!]
  NOT: [EducationSubscriptionWhereInput!]
}

input EducationUpdateDataInput {
  schools: SchoolUpdateManyInput
  courses: CourseUpdateManyInput
}

input EducationUpdateInput {
  schools: SchoolUpdateManyInput
  courses: CourseUpdateManyInput
}

input EducationUpdateOneInput {
  create: EducationCreateInput
  update: EducationUpdateDataInput
  upsert: EducationUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: EducationWhereUniqueInput
}

input EducationUpsertNestedInput {
  update: EducationUpdateDataInput!
  create: EducationCreateInput!
}

input EducationWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  schools_every: SchoolWhereInput
  schools_some: SchoolWhereInput
  schools_none: SchoolWhereInput
  courses_every: CourseWhereInput
  courses_some: CourseWhereInput
  courses_none: CourseWhereInput
  AND: [EducationWhereInput!]
  OR: [EducationWhereInput!]
  NOT: [EducationWhereInput!]
}

input EducationWhereUniqueInput {
  id: ID
}

type Event {
  id: ID!
  date: DateTime!
  location: Location!
  type: EventType!
  description: String
  with(where: HumanWhereInput, orderBy: HumanOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Human!]
}

type EventConnection {
  pageInfo: PageInfo!
  edges: [EventEdge]!
  aggregate: AggregateEvent!
}

input EventCreateInput {
  date: DateTime!
  location: LocationCreateOneWithoutEventsInput!
  type: EventType!
  description: String
  with: HumanCreateManyInput
}

input EventCreateManyInput {
  create: [EventCreateInput!]
  connect: [EventWhereUniqueInput!]
}

input EventCreateManyWithoutLocationInput {
  create: [EventCreateWithoutLocationInput!]
  connect: [EventWhereUniqueInput!]
}

input EventCreateOneInput {
  create: EventCreateInput
  connect: EventWhereUniqueInput
}

input EventCreateWithoutLocationInput {
  date: DateTime!
  type: EventType!
  description: String
  with: HumanCreateManyInput
}

type EventEdge {
  node: Event!
  cursor: String!
}

enum EventOrderByInput {
  id_ASC
  id_DESC
  date_ASC
  date_DESC
  type_ASC
  type_DESC
  description_ASC
  description_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type EventPreviousValues {
  id: ID!
  date: DateTime!
  type: EventType!
  description: String
}

type EventSubscriptionPayload {
  mutation: MutationType!
  node: Event
  updatedFields: [String!]
  previousValues: EventPreviousValues
}

input EventSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: EventWhereInput
  AND: [EventSubscriptionWhereInput!]
  OR: [EventSubscriptionWhereInput!]
  NOT: [EventSubscriptionWhereInput!]
}

enum EventType {
  PHOTO
  THOUGHT
  MOVIE
  SEX
  DINING_OUT
  HOLIDAY
  ANNIVERSARY
}

input EventUpdateDataInput {
  date: DateTime
  location: LocationUpdateOneRequiredWithoutEventsInput
  type: EventType
  description: String
  with: HumanUpdateManyInput
}

input EventUpdateInput {
  date: DateTime
  location: LocationUpdateOneRequiredWithoutEventsInput
  type: EventType
  description: String
  with: HumanUpdateManyInput
}

input EventUpdateManyInput {
  create: [EventCreateInput!]
  delete: [EventWhereUniqueInput!]
  connect: [EventWhereUniqueInput!]
  disconnect: [EventWhereUniqueInput!]
  update: [EventUpdateWithWhereUniqueNestedInput!]
  upsert: [EventUpsertWithWhereUniqueNestedInput!]
}

input EventUpdateManyWithoutLocationInput {
  create: [EventCreateWithoutLocationInput!]
  delete: [EventWhereUniqueInput!]
  connect: [EventWhereUniqueInput!]
  disconnect: [EventWhereUniqueInput!]
  update: [EventUpdateWithWhereUniqueWithoutLocationInput!]
  upsert: [EventUpsertWithWhereUniqueWithoutLocationInput!]
}

input EventUpdateOneInput {
  create: EventCreateInput
  update: EventUpdateDataInput
  upsert: EventUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: EventWhereUniqueInput
}

input EventUpdateWithoutLocationDataInput {
  date: DateTime
  type: EventType
  description: String
  with: HumanUpdateManyInput
}

input EventUpdateWithWhereUniqueNestedInput {
  where: EventWhereUniqueInput!
  data: EventUpdateDataInput!
}

input EventUpdateWithWhereUniqueWithoutLocationInput {
  where: EventWhereUniqueInput!
  data: EventUpdateWithoutLocationDataInput!
}

input EventUpsertNestedInput {
  update: EventUpdateDataInput!
  create: EventCreateInput!
}

input EventUpsertWithWhereUniqueNestedInput {
  where: EventWhereUniqueInput!
  update: EventUpdateDataInput!
  create: EventCreateInput!
}

input EventUpsertWithWhereUniqueWithoutLocationInput {
  where: EventWhereUniqueInput!
  update: EventUpdateWithoutLocationDataInput!
  create: EventCreateWithoutLocationInput!
}

input EventWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  date: DateTime
  date_not: DateTime
  date_in: [DateTime!]
  date_not_in: [DateTime!]
  date_lt: DateTime
  date_lte: DateTime
  date_gt: DateTime
  date_gte: DateTime
  location: LocationWhereInput
  type: EventType
  type_not: EventType
  type_in: [EventType!]
  type_not_in: [EventType!]
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  with_every: HumanWhereInput
  with_some: HumanWhereInput
  with_none: HumanWhereInput
  AND: [EventWhereInput!]
  OR: [EventWhereInput!]
  NOT: [EventWhereInput!]
}

input EventWhereUniqueInput {
  id: ID
}

type Favorite {
  id: ID!
  kind: FavoriteKind!
  thing: ID!
}

type FavoriteConnection {
  pageInfo: PageInfo!
  edges: [FavoriteEdge]!
  aggregate: AggregateFavorite!
}

input FavoriteCreateInput {
  kind: FavoriteKind!
  thing: ID!
}

input FavoriteCreateManyInput {
  create: [FavoriteCreateInput!]
  connect: [FavoriteWhereUniqueInput!]
}

type FavoriteEdge {
  node: Favorite!
  cursor: String!
}

enum FavoriteKind {
  COLOR
  FLOWER
  MOVIE
  BOOK
  SONG
  MUSIC_ALBUM
}

enum FavoriteOrderByInput {
  id_ASC
  id_DESC
  kind_ASC
  kind_DESC
  thing_ASC
  thing_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type FavoritePreviousValues {
  id: ID!
  kind: FavoriteKind!
  thing: ID!
}

type FavoriteSubscriptionPayload {
  mutation: MutationType!
  node: Favorite
  updatedFields: [String!]
  previousValues: FavoritePreviousValues
}

input FavoriteSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: FavoriteWhereInput
  AND: [FavoriteSubscriptionWhereInput!]
  OR: [FavoriteSubscriptionWhereInput!]
  NOT: [FavoriteSubscriptionWhereInput!]
}

input FavoriteUpdateDataInput {
  kind: FavoriteKind
  thing: ID
}

input FavoriteUpdateInput {
  kind: FavoriteKind
  thing: ID
}

input FavoriteUpdateManyInput {
  create: [FavoriteCreateInput!]
  delete: [FavoriteWhereUniqueInput!]
  connect: [FavoriteWhereUniqueInput!]
  disconnect: [FavoriteWhereUniqueInput!]
  update: [FavoriteUpdateWithWhereUniqueNestedInput!]
  upsert: [FavoriteUpsertWithWhereUniqueNestedInput!]
}

input FavoriteUpdateWithWhereUniqueNestedInput {
  where: FavoriteWhereUniqueInput!
  data: FavoriteUpdateDataInput!
}

input FavoriteUpsertWithWhereUniqueNestedInput {
  where: FavoriteWhereUniqueInput!
  update: FavoriteUpdateDataInput!
  create: FavoriteCreateInput!
}

input FavoriteWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  kind: FavoriteKind
  kind_not: FavoriteKind
  kind_in: [FavoriteKind!]
  kind_not_in: [FavoriteKind!]
  thing: ID
  thing_not: ID
  thing_in: [ID!]
  thing_not_in: [ID!]
  thing_lt: ID
  thing_lte: ID
  thing_gt: ID
  thing_gte: ID
  thing_contains: ID
  thing_not_contains: ID
  thing_starts_with: ID
  thing_not_starts_with: ID
  thing_ends_with: ID
  thing_not_ends_with: ID
  AND: [FavoriteWhereInput!]
  OR: [FavoriteWhereInput!]
  NOT: [FavoriteWhereInput!]
}

input FavoriteWhereUniqueInput {
  id: ID
}

type FinanceGoals {
  id: ID!
  name: String!
  cost: Float
  due: DateTime
}

type FinanceGoalsConnection {
  pageInfo: PageInfo!
  edges: [FinanceGoalsEdge]!
  aggregate: AggregateFinanceGoals!
}

input FinanceGoalsCreateInput {
  name: String!
  cost: Float
  due: DateTime
}

input FinanceGoalsCreateManyInput {
  create: [FinanceGoalsCreateInput!]
  connect: [FinanceGoalsWhereUniqueInput!]
}

type FinanceGoalsEdge {
  node: FinanceGoals!
  cursor: String!
}

enum FinanceGoalsOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  cost_ASC
  cost_DESC
  due_ASC
  due_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type FinanceGoalsPreviousValues {
  id: ID!
  name: String!
  cost: Float
  due: DateTime
}

type FinanceGoalsSubscriptionPayload {
  mutation: MutationType!
  node: FinanceGoals
  updatedFields: [String!]
  previousValues: FinanceGoalsPreviousValues
}

input FinanceGoalsSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: FinanceGoalsWhereInput
  AND: [FinanceGoalsSubscriptionWhereInput!]
  OR: [FinanceGoalsSubscriptionWhereInput!]
  NOT: [FinanceGoalsSubscriptionWhereInput!]
}

input FinanceGoalsUpdateDataInput {
  name: String
  cost: Float
  due: DateTime
}

input FinanceGoalsUpdateInput {
  name: String
  cost: Float
  due: DateTime
}

input FinanceGoalsUpdateManyInput {
  create: [FinanceGoalsCreateInput!]
  delete: [FinanceGoalsWhereUniqueInput!]
  connect: [FinanceGoalsWhereUniqueInput!]
  disconnect: [FinanceGoalsWhereUniqueInput!]
  update: [FinanceGoalsUpdateWithWhereUniqueNestedInput!]
  upsert: [FinanceGoalsUpsertWithWhereUniqueNestedInput!]
}

input FinanceGoalsUpdateWithWhereUniqueNestedInput {
  where: FinanceGoalsWhereUniqueInput!
  data: FinanceGoalsUpdateDataInput!
}

input FinanceGoalsUpsertWithWhereUniqueNestedInput {
  where: FinanceGoalsWhereUniqueInput!
  update: FinanceGoalsUpdateDataInput!
  create: FinanceGoalsCreateInput!
}

input FinanceGoalsWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  cost: Float
  cost_not: Float
  cost_in: [Float!]
  cost_not_in: [Float!]
  cost_lt: Float
  cost_lte: Float
  cost_gt: Float
  cost_gte: Float
  due: DateTime
  due_not: DateTime
  due_in: [DateTime!]
  due_not_in: [DateTime!]
  due_lt: DateTime
  due_lte: DateTime
  due_gt: DateTime
  due_gte: DateTime
  AND: [FinanceGoalsWhereInput!]
  OR: [FinanceGoalsWhereInput!]
  NOT: [FinanceGoalsWhereInput!]
}

input FinanceGoalsWhereUniqueInput {
  id: ID
}

type FixedCost {
  id: ID!
  name: String
  amount: Float
  type: FixedCostType
}

type FixedCostConnection {
  pageInfo: PageInfo!
  edges: [FixedCostEdge]!
  aggregate: AggregateFixedCost!
}

input FixedCostCreateInput {
  name: String
  amount: Float
  type: FixedCostType
}

input FixedCostCreateManyInput {
  create: [FixedCostCreateInput!]
  connect: [FixedCostWhereUniqueInput!]
}

type FixedCostEdge {
  node: FixedCost!
  cursor: String!
}

enum FixedCostOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  amount_ASC
  amount_DESC
  type_ASC
  type_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type FixedCostPreviousValues {
  id: ID!
  name: String
  amount: Float
  type: FixedCostType
}

type FixedCostSubscriptionPayload {
  mutation: MutationType!
  node: FixedCost
  updatedFields: [String!]
  previousValues: FixedCostPreviousValues
}

input FixedCostSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: FixedCostWhereInput
  AND: [FixedCostSubscriptionWhereInput!]
  OR: [FixedCostSubscriptionWhereInput!]
  NOT: [FixedCostSubscriptionWhereInput!]
}

enum FixedCostType {
  MONTHLY
  DAILY
  YEARLY
  WEEKLY
}

input FixedCostUpdateDataInput {
  name: String
  amount: Float
  type: FixedCostType
}

input FixedCostUpdateInput {
  name: String
  amount: Float
  type: FixedCostType
}

input FixedCostUpdateManyInput {
  create: [FixedCostCreateInput!]
  delete: [FixedCostWhereUniqueInput!]
  connect: [FixedCostWhereUniqueInput!]
  disconnect: [FixedCostWhereUniqueInput!]
  update: [FixedCostUpdateWithWhereUniqueNestedInput!]
  upsert: [FixedCostUpsertWithWhereUniqueNestedInput!]
}

input FixedCostUpdateWithWhereUniqueNestedInput {
  where: FixedCostWhereUniqueInput!
  data: FixedCostUpdateDataInput!
}

input FixedCostUpsertWithWhereUniqueNestedInput {
  where: FixedCostWhereUniqueInput!
  update: FixedCostUpdateDataInput!
  create: FixedCostCreateInput!
}

input FixedCostWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  amount: Float
  amount_not: Float
  amount_in: [Float!]
  amount_not_in: [Float!]
  amount_lt: Float
  amount_lte: Float
  amount_gt: Float
  amount_gte: Float
  type: FixedCostType
  type_not: FixedCostType
  type_in: [FixedCostType!]
  type_not_in: [FixedCostType!]
  AND: [FixedCostWhereInput!]
  OR: [FixedCostWhereInput!]
  NOT: [FixedCostWhereInput!]
}

input FixedCostWhereUniqueInput {
  id: ID
}

type GoodOrService {
  id: ID!
  type: String
  name: String
  brand: String!
  price: Float!
  url: String
  purchased: Boolean!
  transaction: Transaction
}

type GoodOrServiceConnection {
  pageInfo: PageInfo!
  edges: [GoodOrServiceEdge]!
  aggregate: AggregateGoodOrService!
}

input GoodOrServiceCreateInput {
  type: String
  name: String
  brand: String!
  price: Float!
  url: String
  purchased: Boolean
  transaction: TransactionCreateOneWithoutItemsInput
}

input GoodOrServiceCreateManyInput {
  create: [GoodOrServiceCreateInput!]
  connect: [GoodOrServiceWhereUniqueInput!]
}

input GoodOrServiceCreateManyWithoutTransactionInput {
  create: [GoodOrServiceCreateWithoutTransactionInput!]
  connect: [GoodOrServiceWhereUniqueInput!]
}

input GoodOrServiceCreateWithoutTransactionInput {
  type: String
  name: String
  brand: String!
  price: Float!
  url: String
  purchased: Boolean
}

type GoodOrServiceEdge {
  node: GoodOrService!
  cursor: String!
}

enum GoodOrServiceOrderByInput {
  id_ASC
  id_DESC
  type_ASC
  type_DESC
  name_ASC
  name_DESC
  brand_ASC
  brand_DESC
  price_ASC
  price_DESC
  url_ASC
  url_DESC
  purchased_ASC
  purchased_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type GoodOrServicePreviousValues {
  id: ID!
  type: String
  name: String
  brand: String!
  price: Float!
  url: String
  purchased: Boolean!
}

type GoodOrServiceSubscriptionPayload {
  mutation: MutationType!
  node: GoodOrService
  updatedFields: [String!]
  previousValues: GoodOrServicePreviousValues
}

input GoodOrServiceSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: GoodOrServiceWhereInput
  AND: [GoodOrServiceSubscriptionWhereInput!]
  OR: [GoodOrServiceSubscriptionWhereInput!]
  NOT: [GoodOrServiceSubscriptionWhereInput!]
}

input GoodOrServiceUpdateDataInput {
  type: String
  name: String
  brand: String
  price: Float
  url: String
  purchased: Boolean
  transaction: TransactionUpdateOneWithoutItemsInput
}

input GoodOrServiceUpdateInput {
  type: String
  name: String
  brand: String
  price: Float
  url: String
  purchased: Boolean
  transaction: TransactionUpdateOneWithoutItemsInput
}

input GoodOrServiceUpdateManyInput {
  create: [GoodOrServiceCreateInput!]
  delete: [GoodOrServiceWhereUniqueInput!]
  connect: [GoodOrServiceWhereUniqueInput!]
  disconnect: [GoodOrServiceWhereUniqueInput!]
  update: [GoodOrServiceUpdateWithWhereUniqueNestedInput!]
  upsert: [GoodOrServiceUpsertWithWhereUniqueNestedInput!]
}

input GoodOrServiceUpdateManyWithoutTransactionInput {
  create: [GoodOrServiceCreateWithoutTransactionInput!]
  delete: [GoodOrServiceWhereUniqueInput!]
  connect: [GoodOrServiceWhereUniqueInput!]
  disconnect: [GoodOrServiceWhereUniqueInput!]
  update: [GoodOrServiceUpdateWithWhereUniqueWithoutTransactionInput!]
  upsert: [GoodOrServiceUpsertWithWhereUniqueWithoutTransactionInput!]
}

input GoodOrServiceUpdateWithoutTransactionDataInput {
  type: String
  name: String
  brand: String
  price: Float
  url: String
  purchased: Boolean
}

input GoodOrServiceUpdateWithWhereUniqueNestedInput {
  where: GoodOrServiceWhereUniqueInput!
  data: GoodOrServiceUpdateDataInput!
}

input GoodOrServiceUpdateWithWhereUniqueWithoutTransactionInput {
  where: GoodOrServiceWhereUniqueInput!
  data: GoodOrServiceUpdateWithoutTransactionDataInput!
}

input GoodOrServiceUpsertWithWhereUniqueNestedInput {
  where: GoodOrServiceWhereUniqueInput!
  update: GoodOrServiceUpdateDataInput!
  create: GoodOrServiceCreateInput!
}

input GoodOrServiceUpsertWithWhereUniqueWithoutTransactionInput {
  where: GoodOrServiceWhereUniqueInput!
  update: GoodOrServiceUpdateWithoutTransactionDataInput!
  create: GoodOrServiceCreateWithoutTransactionInput!
}

input GoodOrServiceWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  type: String
  type_not: String
  type_in: [String!]
  type_not_in: [String!]
  type_lt: String
  type_lte: String
  type_gt: String
  type_gte: String
  type_contains: String
  type_not_contains: String
  type_starts_with: String
  type_not_starts_with: String
  type_ends_with: String
  type_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  brand: String
  brand_not: String
  brand_in: [String!]
  brand_not_in: [String!]
  brand_lt: String
  brand_lte: String
  brand_gt: String
  brand_gte: String
  brand_contains: String
  brand_not_contains: String
  brand_starts_with: String
  brand_not_starts_with: String
  brand_ends_with: String
  brand_not_ends_with: String
  price: Float
  price_not: Float
  price_in: [Float!]
  price_not_in: [Float!]
  price_lt: Float
  price_lte: Float
  price_gt: Float
  price_gte: Float
  url: String
  url_not: String
  url_in: [String!]
  url_not_in: [String!]
  url_lt: String
  url_lte: String
  url_gt: String
  url_gte: String
  url_contains: String
  url_not_contains: String
  url_starts_with: String
  url_not_starts_with: String
  url_ends_with: String
  url_not_ends_with: String
  purchased: Boolean
  purchased_not: Boolean
  transaction: TransactionWhereInput
  AND: [GoodOrServiceWhereInput!]
  OR: [GoodOrServiceWhereInput!]
  NOT: [GoodOrServiceWhereInput!]
}

input GoodOrServiceWhereUniqueInput {
  id: ID
}

type Human {
  id: ID!
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites(where: FavoriteWhereInput, orderBy: FavoriteOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Favorite!]
  wish_list(where: GoodOrServiceWhereInput, orderBy: GoodOrServiceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [GoodOrService!]
  contact: ContactInfo
  education: Education
  tasks(where: TaskWhereInput, orderBy: TaskOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Task!]
  tv_shows(where: TvEpisodeTransactionWhereInput, orderBy: TvEpisodeTransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TvEpisodeTransaction!]
  movies(where: MovieTransactionWhereInput, orderBy: MovieTransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [MovieTransaction!]
  books(where: BookTransactionWhereInput, orderBy: BookTransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [BookTransaction!]
  father: Human
  mother: Human
  siblings(where: HumanWhereInput, orderBy: HumanOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Human!]
  aunts(where: HumanWhereInput, orderBy: HumanOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Human!]
  uncles(where: HumanWhereInput, orderBy: HumanOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Human!]
  grandparents(where: HumanWhereInput, orderBy: HumanOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Human!]
  great_grandparents(where: HumanWhereInput, orderBy: HumanOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Human!]
  friends(where: HumanWhereInput, orderBy: HumanOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Human!]
  acquaintances(where: HumanWhereInput, orderBy: HumanOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Human!]
  colleagues(where: HumanWhereInput, orderBy: HumanOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Human!]
  height: Float
  weight: Float
  weight_history(where: WeightHistoryItemWhereInput, orderBy: WeightHistoryItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [WeightHistoryItem!]
  directed(where: MovieWhereInput, orderBy: MovieOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Movie!]
  acted_in(where: MovieWhereInput, orderBy: MovieOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Movie!]
}

type HumanConnection {
  pageInfo: PageInfo!
  edges: [HumanEdge]!
  aggregate: AggregateHuman!
}

input HumanCreateInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteCreateManyInput
  wish_list: GoodOrServiceCreateManyInput
  contact: ContactInfoCreateOneWithoutHumanInput
  education: EducationCreateOneInput
  tasks: TaskCreateManyInput
  tv_shows: TvEpisodeTransactionCreateManyWithoutHumanInput
  movies: MovieTransactionCreateManyInput
  books: BookTransactionCreateManyInput
  father: HumanCreateOneWithoutFatherInput
  mother: HumanCreateOneWithoutMotherInput
  siblings: HumanCreateManyWithoutSiblingsInput
  aunts: HumanCreateManyWithoutAuntsInput
  uncles: HumanCreateManyWithoutUnclesInput
  grandparents: HumanCreateManyWithoutGrandparentsInput
  great_grandparents: HumanCreateManyWithoutGreat_grandparentsInput
  friends: HumanCreateManyWithoutFriendsInput
  acquaintances: HumanCreateManyWithoutAcquaintancesInput
  colleagues: HumanCreateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemCreateManyWithoutHumanInput
  directed: MovieCreateManyWithoutDirectorInput
  acted_in: MovieCreateManyWithoutActorsInput
}

input HumanCreateManyInput {
  create: [HumanCreateInput!]
  connect: [HumanWhereUniqueInput!]
}

input HumanCreateManyWithoutAcquaintancesInput {
  create: [HumanCreateWithoutAcquaintancesInput!]
  connect: [HumanWhereUniqueInput!]
}

input HumanCreateManyWithoutActed_inInput {
  create: [HumanCreateWithoutActed_inInput!]
  connect: [HumanWhereUniqueInput!]
}

input HumanCreateManyWithoutAuntsInput {
  create: [HumanCreateWithoutAuntsInput!]
  connect: [HumanWhereUniqueInput!]
}

input HumanCreateManyWithoutColleaguesInput {
  create: [HumanCreateWithoutColleaguesInput!]
  connect: [HumanWhereUniqueInput!]
}

input HumanCreateManyWithoutFriendsInput {
  create: [HumanCreateWithoutFriendsInput!]
  connect: [HumanWhereUniqueInput!]
}

input HumanCreateManyWithoutGrandparentsInput {
  create: [HumanCreateWithoutGrandparentsInput!]
  connect: [HumanWhereUniqueInput!]
}

input HumanCreateManyWithoutGreat_grandparentsInput {
  create: [HumanCreateWithoutGreat_grandparentsInput!]
  connect: [HumanWhereUniqueInput!]
}

input HumanCreateManyWithoutSiblingsInput {
  create: [HumanCreateWithoutSiblingsInput!]
  connect: [HumanWhereUniqueInput!]
}

input HumanCreateManyWithoutUnclesInput {
  create: [HumanCreateWithoutUnclesInput!]
  connect: [HumanWhereUniqueInput!]
}

input HumanCreateOneInput {
  create: HumanCreateInput
  connect: HumanWhereUniqueInput
}

input HumanCreateOneWithoutContactInput {
  create: HumanCreateWithoutContactInput
  connect: HumanWhereUniqueInput
}

input HumanCreateOneWithoutDirectedInput {
  create: HumanCreateWithoutDirectedInput
  connect: HumanWhereUniqueInput
}

input HumanCreateOneWithoutFatherInput {
  create: HumanCreateWithoutFatherInput
  connect: HumanWhereUniqueInput
}

input HumanCreateOneWithoutMotherInput {
  create: HumanCreateWithoutMotherInput
  connect: HumanWhereUniqueInput
}

input HumanCreateOneWithoutTv_showsInput {
  create: HumanCreateWithoutTv_showsInput
  connect: HumanWhereUniqueInput
}

input HumanCreateOneWithoutWeight_historyInput {
  create: HumanCreateWithoutWeight_historyInput
  connect: HumanWhereUniqueInput
}

input HumanCreateWithoutAcquaintancesInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteCreateManyInput
  wish_list: GoodOrServiceCreateManyInput
  contact: ContactInfoCreateOneWithoutHumanInput
  education: EducationCreateOneInput
  tasks: TaskCreateManyInput
  tv_shows: TvEpisodeTransactionCreateManyWithoutHumanInput
  movies: MovieTransactionCreateManyInput
  books: BookTransactionCreateManyInput
  father: HumanCreateOneWithoutFatherInput
  mother: HumanCreateOneWithoutMotherInput
  siblings: HumanCreateManyWithoutSiblingsInput
  aunts: HumanCreateManyWithoutAuntsInput
  uncles: HumanCreateManyWithoutUnclesInput
  grandparents: HumanCreateManyWithoutGrandparentsInput
  great_grandparents: HumanCreateManyWithoutGreat_grandparentsInput
  friends: HumanCreateManyWithoutFriendsInput
  colleagues: HumanCreateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemCreateManyWithoutHumanInput
  directed: MovieCreateManyWithoutDirectorInput
  acted_in: MovieCreateManyWithoutActorsInput
}

input HumanCreateWithoutActed_inInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteCreateManyInput
  wish_list: GoodOrServiceCreateManyInput
  contact: ContactInfoCreateOneWithoutHumanInput
  education: EducationCreateOneInput
  tasks: TaskCreateManyInput
  tv_shows: TvEpisodeTransactionCreateManyWithoutHumanInput
  movies: MovieTransactionCreateManyInput
  books: BookTransactionCreateManyInput
  father: HumanCreateOneWithoutFatherInput
  mother: HumanCreateOneWithoutMotherInput
  siblings: HumanCreateManyWithoutSiblingsInput
  aunts: HumanCreateManyWithoutAuntsInput
  uncles: HumanCreateManyWithoutUnclesInput
  grandparents: HumanCreateManyWithoutGrandparentsInput
  great_grandparents: HumanCreateManyWithoutGreat_grandparentsInput
  friends: HumanCreateManyWithoutFriendsInput
  acquaintances: HumanCreateManyWithoutAcquaintancesInput
  colleagues: HumanCreateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemCreateManyWithoutHumanInput
  directed: MovieCreateManyWithoutDirectorInput
}

input HumanCreateWithoutAuntsInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteCreateManyInput
  wish_list: GoodOrServiceCreateManyInput
  contact: ContactInfoCreateOneWithoutHumanInput
  education: EducationCreateOneInput
  tasks: TaskCreateManyInput
  tv_shows: TvEpisodeTransactionCreateManyWithoutHumanInput
  movies: MovieTransactionCreateManyInput
  books: BookTransactionCreateManyInput
  father: HumanCreateOneWithoutFatherInput
  mother: HumanCreateOneWithoutMotherInput
  siblings: HumanCreateManyWithoutSiblingsInput
  uncles: HumanCreateManyWithoutUnclesInput
  grandparents: HumanCreateManyWithoutGrandparentsInput
  great_grandparents: HumanCreateManyWithoutGreat_grandparentsInput
  friends: HumanCreateManyWithoutFriendsInput
  acquaintances: HumanCreateManyWithoutAcquaintancesInput
  colleagues: HumanCreateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemCreateManyWithoutHumanInput
  directed: MovieCreateManyWithoutDirectorInput
  acted_in: MovieCreateManyWithoutActorsInput
}

input HumanCreateWithoutColleaguesInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteCreateManyInput
  wish_list: GoodOrServiceCreateManyInput
  contact: ContactInfoCreateOneWithoutHumanInput
  education: EducationCreateOneInput
  tasks: TaskCreateManyInput
  tv_shows: TvEpisodeTransactionCreateManyWithoutHumanInput
  movies: MovieTransactionCreateManyInput
  books: BookTransactionCreateManyInput
  father: HumanCreateOneWithoutFatherInput
  mother: HumanCreateOneWithoutMotherInput
  siblings: HumanCreateManyWithoutSiblingsInput
  aunts: HumanCreateManyWithoutAuntsInput
  uncles: HumanCreateManyWithoutUnclesInput
  grandparents: HumanCreateManyWithoutGrandparentsInput
  great_grandparents: HumanCreateManyWithoutGreat_grandparentsInput
  friends: HumanCreateManyWithoutFriendsInput
  acquaintances: HumanCreateManyWithoutAcquaintancesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemCreateManyWithoutHumanInput
  directed: MovieCreateManyWithoutDirectorInput
  acted_in: MovieCreateManyWithoutActorsInput
}

input HumanCreateWithoutContactInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteCreateManyInput
  wish_list: GoodOrServiceCreateManyInput
  education: EducationCreateOneInput
  tasks: TaskCreateManyInput
  tv_shows: TvEpisodeTransactionCreateManyWithoutHumanInput
  movies: MovieTransactionCreateManyInput
  books: BookTransactionCreateManyInput
  father: HumanCreateOneWithoutFatherInput
  mother: HumanCreateOneWithoutMotherInput
  siblings: HumanCreateManyWithoutSiblingsInput
  aunts: HumanCreateManyWithoutAuntsInput
  uncles: HumanCreateManyWithoutUnclesInput
  grandparents: HumanCreateManyWithoutGrandparentsInput
  great_grandparents: HumanCreateManyWithoutGreat_grandparentsInput
  friends: HumanCreateManyWithoutFriendsInput
  acquaintances: HumanCreateManyWithoutAcquaintancesInput
  colleagues: HumanCreateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemCreateManyWithoutHumanInput
  directed: MovieCreateManyWithoutDirectorInput
  acted_in: MovieCreateManyWithoutActorsInput
}

input HumanCreateWithoutDirectedInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteCreateManyInput
  wish_list: GoodOrServiceCreateManyInput
  contact: ContactInfoCreateOneWithoutHumanInput
  education: EducationCreateOneInput
  tasks: TaskCreateManyInput
  tv_shows: TvEpisodeTransactionCreateManyWithoutHumanInput
  movies: MovieTransactionCreateManyInput
  books: BookTransactionCreateManyInput
  father: HumanCreateOneWithoutFatherInput
  mother: HumanCreateOneWithoutMotherInput
  siblings: HumanCreateManyWithoutSiblingsInput
  aunts: HumanCreateManyWithoutAuntsInput
  uncles: HumanCreateManyWithoutUnclesInput
  grandparents: HumanCreateManyWithoutGrandparentsInput
  great_grandparents: HumanCreateManyWithoutGreat_grandparentsInput
  friends: HumanCreateManyWithoutFriendsInput
  acquaintances: HumanCreateManyWithoutAcquaintancesInput
  colleagues: HumanCreateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemCreateManyWithoutHumanInput
  acted_in: MovieCreateManyWithoutActorsInput
}

input HumanCreateWithoutFatherInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteCreateManyInput
  wish_list: GoodOrServiceCreateManyInput
  contact: ContactInfoCreateOneWithoutHumanInput
  education: EducationCreateOneInput
  tasks: TaskCreateManyInput
  tv_shows: TvEpisodeTransactionCreateManyWithoutHumanInput
  movies: MovieTransactionCreateManyInput
  books: BookTransactionCreateManyInput
  mother: HumanCreateOneWithoutMotherInput
  siblings: HumanCreateManyWithoutSiblingsInput
  aunts: HumanCreateManyWithoutAuntsInput
  uncles: HumanCreateManyWithoutUnclesInput
  grandparents: HumanCreateManyWithoutGrandparentsInput
  great_grandparents: HumanCreateManyWithoutGreat_grandparentsInput
  friends: HumanCreateManyWithoutFriendsInput
  acquaintances: HumanCreateManyWithoutAcquaintancesInput
  colleagues: HumanCreateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemCreateManyWithoutHumanInput
  directed: MovieCreateManyWithoutDirectorInput
  acted_in: MovieCreateManyWithoutActorsInput
}

input HumanCreateWithoutFriendsInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteCreateManyInput
  wish_list: GoodOrServiceCreateManyInput
  contact: ContactInfoCreateOneWithoutHumanInput
  education: EducationCreateOneInput
  tasks: TaskCreateManyInput
  tv_shows: TvEpisodeTransactionCreateManyWithoutHumanInput
  movies: MovieTransactionCreateManyInput
  books: BookTransactionCreateManyInput
  father: HumanCreateOneWithoutFatherInput
  mother: HumanCreateOneWithoutMotherInput
  siblings: HumanCreateManyWithoutSiblingsInput
  aunts: HumanCreateManyWithoutAuntsInput
  uncles: HumanCreateManyWithoutUnclesInput
  grandparents: HumanCreateManyWithoutGrandparentsInput
  great_grandparents: HumanCreateManyWithoutGreat_grandparentsInput
  acquaintances: HumanCreateManyWithoutAcquaintancesInput
  colleagues: HumanCreateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemCreateManyWithoutHumanInput
  directed: MovieCreateManyWithoutDirectorInput
  acted_in: MovieCreateManyWithoutActorsInput
}

input HumanCreateWithoutGrandparentsInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteCreateManyInput
  wish_list: GoodOrServiceCreateManyInput
  contact: ContactInfoCreateOneWithoutHumanInput
  education: EducationCreateOneInput
  tasks: TaskCreateManyInput
  tv_shows: TvEpisodeTransactionCreateManyWithoutHumanInput
  movies: MovieTransactionCreateManyInput
  books: BookTransactionCreateManyInput
  father: HumanCreateOneWithoutFatherInput
  mother: HumanCreateOneWithoutMotherInput
  siblings: HumanCreateManyWithoutSiblingsInput
  aunts: HumanCreateManyWithoutAuntsInput
  uncles: HumanCreateManyWithoutUnclesInput
  great_grandparents: HumanCreateManyWithoutGreat_grandparentsInput
  friends: HumanCreateManyWithoutFriendsInput
  acquaintances: HumanCreateManyWithoutAcquaintancesInput
  colleagues: HumanCreateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemCreateManyWithoutHumanInput
  directed: MovieCreateManyWithoutDirectorInput
  acted_in: MovieCreateManyWithoutActorsInput
}

input HumanCreateWithoutGreat_grandparentsInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteCreateManyInput
  wish_list: GoodOrServiceCreateManyInput
  contact: ContactInfoCreateOneWithoutHumanInput
  education: EducationCreateOneInput
  tasks: TaskCreateManyInput
  tv_shows: TvEpisodeTransactionCreateManyWithoutHumanInput
  movies: MovieTransactionCreateManyInput
  books: BookTransactionCreateManyInput
  father: HumanCreateOneWithoutFatherInput
  mother: HumanCreateOneWithoutMotherInput
  siblings: HumanCreateManyWithoutSiblingsInput
  aunts: HumanCreateManyWithoutAuntsInput
  uncles: HumanCreateManyWithoutUnclesInput
  grandparents: HumanCreateManyWithoutGrandparentsInput
  friends: HumanCreateManyWithoutFriendsInput
  acquaintances: HumanCreateManyWithoutAcquaintancesInput
  colleagues: HumanCreateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemCreateManyWithoutHumanInput
  directed: MovieCreateManyWithoutDirectorInput
  acted_in: MovieCreateManyWithoutActorsInput
}

input HumanCreateWithoutMotherInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteCreateManyInput
  wish_list: GoodOrServiceCreateManyInput
  contact: ContactInfoCreateOneWithoutHumanInput
  education: EducationCreateOneInput
  tasks: TaskCreateManyInput
  tv_shows: TvEpisodeTransactionCreateManyWithoutHumanInput
  movies: MovieTransactionCreateManyInput
  books: BookTransactionCreateManyInput
  father: HumanCreateOneWithoutFatherInput
  siblings: HumanCreateManyWithoutSiblingsInput
  aunts: HumanCreateManyWithoutAuntsInput
  uncles: HumanCreateManyWithoutUnclesInput
  grandparents: HumanCreateManyWithoutGrandparentsInput
  great_grandparents: HumanCreateManyWithoutGreat_grandparentsInput
  friends: HumanCreateManyWithoutFriendsInput
  acquaintances: HumanCreateManyWithoutAcquaintancesInput
  colleagues: HumanCreateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemCreateManyWithoutHumanInput
  directed: MovieCreateManyWithoutDirectorInput
  acted_in: MovieCreateManyWithoutActorsInput
}

input HumanCreateWithoutSiblingsInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteCreateManyInput
  wish_list: GoodOrServiceCreateManyInput
  contact: ContactInfoCreateOneWithoutHumanInput
  education: EducationCreateOneInput
  tasks: TaskCreateManyInput
  tv_shows: TvEpisodeTransactionCreateManyWithoutHumanInput
  movies: MovieTransactionCreateManyInput
  books: BookTransactionCreateManyInput
  father: HumanCreateOneWithoutFatherInput
  mother: HumanCreateOneWithoutMotherInput
  aunts: HumanCreateManyWithoutAuntsInput
  uncles: HumanCreateManyWithoutUnclesInput
  grandparents: HumanCreateManyWithoutGrandparentsInput
  great_grandparents: HumanCreateManyWithoutGreat_grandparentsInput
  friends: HumanCreateManyWithoutFriendsInput
  acquaintances: HumanCreateManyWithoutAcquaintancesInput
  colleagues: HumanCreateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemCreateManyWithoutHumanInput
  directed: MovieCreateManyWithoutDirectorInput
  acted_in: MovieCreateManyWithoutActorsInput
}

input HumanCreateWithoutTv_showsInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteCreateManyInput
  wish_list: GoodOrServiceCreateManyInput
  contact: ContactInfoCreateOneWithoutHumanInput
  education: EducationCreateOneInput
  tasks: TaskCreateManyInput
  movies: MovieTransactionCreateManyInput
  books: BookTransactionCreateManyInput
  father: HumanCreateOneWithoutFatherInput
  mother: HumanCreateOneWithoutMotherInput
  siblings: HumanCreateManyWithoutSiblingsInput
  aunts: HumanCreateManyWithoutAuntsInput
  uncles: HumanCreateManyWithoutUnclesInput
  grandparents: HumanCreateManyWithoutGrandparentsInput
  great_grandparents: HumanCreateManyWithoutGreat_grandparentsInput
  friends: HumanCreateManyWithoutFriendsInput
  acquaintances: HumanCreateManyWithoutAcquaintancesInput
  colleagues: HumanCreateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemCreateManyWithoutHumanInput
  directed: MovieCreateManyWithoutDirectorInput
  acted_in: MovieCreateManyWithoutActorsInput
}

input HumanCreateWithoutUnclesInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteCreateManyInput
  wish_list: GoodOrServiceCreateManyInput
  contact: ContactInfoCreateOneWithoutHumanInput
  education: EducationCreateOneInput
  tasks: TaskCreateManyInput
  tv_shows: TvEpisodeTransactionCreateManyWithoutHumanInput
  movies: MovieTransactionCreateManyInput
  books: BookTransactionCreateManyInput
  father: HumanCreateOneWithoutFatherInput
  mother: HumanCreateOneWithoutMotherInput
  siblings: HumanCreateManyWithoutSiblingsInput
  aunts: HumanCreateManyWithoutAuntsInput
  grandparents: HumanCreateManyWithoutGrandparentsInput
  great_grandparents: HumanCreateManyWithoutGreat_grandparentsInput
  friends: HumanCreateManyWithoutFriendsInput
  acquaintances: HumanCreateManyWithoutAcquaintancesInput
  colleagues: HumanCreateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemCreateManyWithoutHumanInput
  directed: MovieCreateManyWithoutDirectorInput
  acted_in: MovieCreateManyWithoutActorsInput
}

input HumanCreateWithoutWeight_historyInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteCreateManyInput
  wish_list: GoodOrServiceCreateManyInput
  contact: ContactInfoCreateOneWithoutHumanInput
  education: EducationCreateOneInput
  tasks: TaskCreateManyInput
  tv_shows: TvEpisodeTransactionCreateManyWithoutHumanInput
  movies: MovieTransactionCreateManyInput
  books: BookTransactionCreateManyInput
  father: HumanCreateOneWithoutFatherInput
  mother: HumanCreateOneWithoutMotherInput
  siblings: HumanCreateManyWithoutSiblingsInput
  aunts: HumanCreateManyWithoutAuntsInput
  uncles: HumanCreateManyWithoutUnclesInput
  grandparents: HumanCreateManyWithoutGrandparentsInput
  great_grandparents: HumanCreateManyWithoutGreat_grandparentsInput
  friends: HumanCreateManyWithoutFriendsInput
  acquaintances: HumanCreateManyWithoutAcquaintancesInput
  colleagues: HumanCreateManyWithoutColleaguesInput
  height: Float
  weight: Float
  directed: MovieCreateManyWithoutDirectorInput
  acted_in: MovieCreateManyWithoutActorsInput
}

type HumanEdge {
  node: Human!
  cursor: String!
}

enum HumanOrderByInput {
  id_ASC
  id_DESC
  first_name_ASC
  first_name_DESC
  last_name_ASC
  last_name_DESC
  middle_name_ASC
  middle_name_DESC
  birthday_ASC
  birthday_DESC
  height_ASC
  height_DESC
  weight_ASC
  weight_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type HumanPreviousValues {
  id: ID!
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  height: Float
  weight: Float
}

type HumanSubscriptionPayload {
  mutation: MutationType!
  node: Human
  updatedFields: [String!]
  previousValues: HumanPreviousValues
}

input HumanSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: HumanWhereInput
  AND: [HumanSubscriptionWhereInput!]
  OR: [HumanSubscriptionWhereInput!]
  NOT: [HumanSubscriptionWhereInput!]
}

input HumanUpdateDataInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteUpdateManyInput
  wish_list: GoodOrServiceUpdateManyInput
  contact: ContactInfoUpdateOneWithoutHumanInput
  education: EducationUpdateOneInput
  tasks: TaskUpdateManyInput
  tv_shows: TvEpisodeTransactionUpdateManyWithoutHumanInput
  movies: MovieTransactionUpdateManyInput
  books: BookTransactionUpdateManyInput
  father: HumanUpdateOneWithoutFatherInput
  mother: HumanUpdateOneWithoutMotherInput
  siblings: HumanUpdateManyWithoutSiblingsInput
  aunts: HumanUpdateManyWithoutAuntsInput
  uncles: HumanUpdateManyWithoutUnclesInput
  grandparents: HumanUpdateManyWithoutGrandparentsInput
  great_grandparents: HumanUpdateManyWithoutGreat_grandparentsInput
  friends: HumanUpdateManyWithoutFriendsInput
  acquaintances: HumanUpdateManyWithoutAcquaintancesInput
  colleagues: HumanUpdateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemUpdateManyWithoutHumanInput
  directed: MovieUpdateManyWithoutDirectorInput
  acted_in: MovieUpdateManyWithoutActorsInput
}

input HumanUpdateInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteUpdateManyInput
  wish_list: GoodOrServiceUpdateManyInput
  contact: ContactInfoUpdateOneWithoutHumanInput
  education: EducationUpdateOneInput
  tasks: TaskUpdateManyInput
  tv_shows: TvEpisodeTransactionUpdateManyWithoutHumanInput
  movies: MovieTransactionUpdateManyInput
  books: BookTransactionUpdateManyInput
  father: HumanUpdateOneWithoutFatherInput
  mother: HumanUpdateOneWithoutMotherInput
  siblings: HumanUpdateManyWithoutSiblingsInput
  aunts: HumanUpdateManyWithoutAuntsInput
  uncles: HumanUpdateManyWithoutUnclesInput
  grandparents: HumanUpdateManyWithoutGrandparentsInput
  great_grandparents: HumanUpdateManyWithoutGreat_grandparentsInput
  friends: HumanUpdateManyWithoutFriendsInput
  acquaintances: HumanUpdateManyWithoutAcquaintancesInput
  colleagues: HumanUpdateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemUpdateManyWithoutHumanInput
  directed: MovieUpdateManyWithoutDirectorInput
  acted_in: MovieUpdateManyWithoutActorsInput
}

input HumanUpdateManyInput {
  create: [HumanCreateInput!]
  delete: [HumanWhereUniqueInput!]
  connect: [HumanWhereUniqueInput!]
  disconnect: [HumanWhereUniqueInput!]
  update: [HumanUpdateWithWhereUniqueNestedInput!]
  upsert: [HumanUpsertWithWhereUniqueNestedInput!]
}

input HumanUpdateManyWithoutAcquaintancesInput {
  create: [HumanCreateWithoutAcquaintancesInput!]
  delete: [HumanWhereUniqueInput!]
  connect: [HumanWhereUniqueInput!]
  disconnect: [HumanWhereUniqueInput!]
  update: [HumanUpdateWithWhereUniqueWithoutAcquaintancesInput!]
  upsert: [HumanUpsertWithWhereUniqueWithoutAcquaintancesInput!]
}

input HumanUpdateManyWithoutActed_inInput {
  create: [HumanCreateWithoutActed_inInput!]
  delete: [HumanWhereUniqueInput!]
  connect: [HumanWhereUniqueInput!]
  disconnect: [HumanWhereUniqueInput!]
  update: [HumanUpdateWithWhereUniqueWithoutActed_inInput!]
  upsert: [HumanUpsertWithWhereUniqueWithoutActed_inInput!]
}

input HumanUpdateManyWithoutAuntsInput {
  create: [HumanCreateWithoutAuntsInput!]
  delete: [HumanWhereUniqueInput!]
  connect: [HumanWhereUniqueInput!]
  disconnect: [HumanWhereUniqueInput!]
  update: [HumanUpdateWithWhereUniqueWithoutAuntsInput!]
  upsert: [HumanUpsertWithWhereUniqueWithoutAuntsInput!]
}

input HumanUpdateManyWithoutColleaguesInput {
  create: [HumanCreateWithoutColleaguesInput!]
  delete: [HumanWhereUniqueInput!]
  connect: [HumanWhereUniqueInput!]
  disconnect: [HumanWhereUniqueInput!]
  update: [HumanUpdateWithWhereUniqueWithoutColleaguesInput!]
  upsert: [HumanUpsertWithWhereUniqueWithoutColleaguesInput!]
}

input HumanUpdateManyWithoutFriendsInput {
  create: [HumanCreateWithoutFriendsInput!]
  delete: [HumanWhereUniqueInput!]
  connect: [HumanWhereUniqueInput!]
  disconnect: [HumanWhereUniqueInput!]
  update: [HumanUpdateWithWhereUniqueWithoutFriendsInput!]
  upsert: [HumanUpsertWithWhereUniqueWithoutFriendsInput!]
}

input HumanUpdateManyWithoutGrandparentsInput {
  create: [HumanCreateWithoutGrandparentsInput!]
  delete: [HumanWhereUniqueInput!]
  connect: [HumanWhereUniqueInput!]
  disconnect: [HumanWhereUniqueInput!]
  update: [HumanUpdateWithWhereUniqueWithoutGrandparentsInput!]
  upsert: [HumanUpsertWithWhereUniqueWithoutGrandparentsInput!]
}

input HumanUpdateManyWithoutGreat_grandparentsInput {
  create: [HumanCreateWithoutGreat_grandparentsInput!]
  delete: [HumanWhereUniqueInput!]
  connect: [HumanWhereUniqueInput!]
  disconnect: [HumanWhereUniqueInput!]
  update: [HumanUpdateWithWhereUniqueWithoutGreat_grandparentsInput!]
  upsert: [HumanUpsertWithWhereUniqueWithoutGreat_grandparentsInput!]
}

input HumanUpdateManyWithoutSiblingsInput {
  create: [HumanCreateWithoutSiblingsInput!]
  delete: [HumanWhereUniqueInput!]
  connect: [HumanWhereUniqueInput!]
  disconnect: [HumanWhereUniqueInput!]
  update: [HumanUpdateWithWhereUniqueWithoutSiblingsInput!]
  upsert: [HumanUpsertWithWhereUniqueWithoutSiblingsInput!]
}

input HumanUpdateManyWithoutUnclesInput {
  create: [HumanCreateWithoutUnclesInput!]
  delete: [HumanWhereUniqueInput!]
  connect: [HumanWhereUniqueInput!]
  disconnect: [HumanWhereUniqueInput!]
  update: [HumanUpdateWithWhereUniqueWithoutUnclesInput!]
  upsert: [HumanUpsertWithWhereUniqueWithoutUnclesInput!]
}

input HumanUpdateOneRequiredInput {
  create: HumanCreateInput
  update: HumanUpdateDataInput
  upsert: HumanUpsertNestedInput
  connect: HumanWhereUniqueInput
}

input HumanUpdateOneRequiredWithoutContactInput {
  create: HumanCreateWithoutContactInput
  update: HumanUpdateWithoutContactDataInput
  upsert: HumanUpsertWithoutContactInput
  connect: HumanWhereUniqueInput
}

input HumanUpdateOneRequiredWithoutTv_showsInput {
  create: HumanCreateWithoutTv_showsInput
  update: HumanUpdateWithoutTv_showsDataInput
  upsert: HumanUpsertWithoutTv_showsInput
  connect: HumanWhereUniqueInput
}

input HumanUpdateOneRequiredWithoutWeight_historyInput {
  create: HumanCreateWithoutWeight_historyInput
  update: HumanUpdateWithoutWeight_historyDataInput
  upsert: HumanUpsertWithoutWeight_historyInput
  connect: HumanWhereUniqueInput
}

input HumanUpdateOneWithoutDirectedInput {
  create: HumanCreateWithoutDirectedInput
  update: HumanUpdateWithoutDirectedDataInput
  upsert: HumanUpsertWithoutDirectedInput
  delete: Boolean
  disconnect: Boolean
  connect: HumanWhereUniqueInput
}

input HumanUpdateOneWithoutFatherInput {
  create: HumanCreateWithoutFatherInput
  update: HumanUpdateWithoutFatherDataInput
  upsert: HumanUpsertWithoutFatherInput
  delete: Boolean
  disconnect: Boolean
  connect: HumanWhereUniqueInput
}

input HumanUpdateOneWithoutMotherInput {
  create: HumanCreateWithoutMotherInput
  update: HumanUpdateWithoutMotherDataInput
  upsert: HumanUpsertWithoutMotherInput
  delete: Boolean
  disconnect: Boolean
  connect: HumanWhereUniqueInput
}

input HumanUpdateWithoutAcquaintancesDataInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteUpdateManyInput
  wish_list: GoodOrServiceUpdateManyInput
  contact: ContactInfoUpdateOneWithoutHumanInput
  education: EducationUpdateOneInput
  tasks: TaskUpdateManyInput
  tv_shows: TvEpisodeTransactionUpdateManyWithoutHumanInput
  movies: MovieTransactionUpdateManyInput
  books: BookTransactionUpdateManyInput
  father: HumanUpdateOneWithoutFatherInput
  mother: HumanUpdateOneWithoutMotherInput
  siblings: HumanUpdateManyWithoutSiblingsInput
  aunts: HumanUpdateManyWithoutAuntsInput
  uncles: HumanUpdateManyWithoutUnclesInput
  grandparents: HumanUpdateManyWithoutGrandparentsInput
  great_grandparents: HumanUpdateManyWithoutGreat_grandparentsInput
  friends: HumanUpdateManyWithoutFriendsInput
  colleagues: HumanUpdateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemUpdateManyWithoutHumanInput
  directed: MovieUpdateManyWithoutDirectorInput
  acted_in: MovieUpdateManyWithoutActorsInput
}

input HumanUpdateWithoutActed_inDataInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteUpdateManyInput
  wish_list: GoodOrServiceUpdateManyInput
  contact: ContactInfoUpdateOneWithoutHumanInput
  education: EducationUpdateOneInput
  tasks: TaskUpdateManyInput
  tv_shows: TvEpisodeTransactionUpdateManyWithoutHumanInput
  movies: MovieTransactionUpdateManyInput
  books: BookTransactionUpdateManyInput
  father: HumanUpdateOneWithoutFatherInput
  mother: HumanUpdateOneWithoutMotherInput
  siblings: HumanUpdateManyWithoutSiblingsInput
  aunts: HumanUpdateManyWithoutAuntsInput
  uncles: HumanUpdateManyWithoutUnclesInput
  grandparents: HumanUpdateManyWithoutGrandparentsInput
  great_grandparents: HumanUpdateManyWithoutGreat_grandparentsInput
  friends: HumanUpdateManyWithoutFriendsInput
  acquaintances: HumanUpdateManyWithoutAcquaintancesInput
  colleagues: HumanUpdateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemUpdateManyWithoutHumanInput
  directed: MovieUpdateManyWithoutDirectorInput
}

input HumanUpdateWithoutAuntsDataInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteUpdateManyInput
  wish_list: GoodOrServiceUpdateManyInput
  contact: ContactInfoUpdateOneWithoutHumanInput
  education: EducationUpdateOneInput
  tasks: TaskUpdateManyInput
  tv_shows: TvEpisodeTransactionUpdateManyWithoutHumanInput
  movies: MovieTransactionUpdateManyInput
  books: BookTransactionUpdateManyInput
  father: HumanUpdateOneWithoutFatherInput
  mother: HumanUpdateOneWithoutMotherInput
  siblings: HumanUpdateManyWithoutSiblingsInput
  uncles: HumanUpdateManyWithoutUnclesInput
  grandparents: HumanUpdateManyWithoutGrandparentsInput
  great_grandparents: HumanUpdateManyWithoutGreat_grandparentsInput
  friends: HumanUpdateManyWithoutFriendsInput
  acquaintances: HumanUpdateManyWithoutAcquaintancesInput
  colleagues: HumanUpdateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemUpdateManyWithoutHumanInput
  directed: MovieUpdateManyWithoutDirectorInput
  acted_in: MovieUpdateManyWithoutActorsInput
}

input HumanUpdateWithoutColleaguesDataInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteUpdateManyInput
  wish_list: GoodOrServiceUpdateManyInput
  contact: ContactInfoUpdateOneWithoutHumanInput
  education: EducationUpdateOneInput
  tasks: TaskUpdateManyInput
  tv_shows: TvEpisodeTransactionUpdateManyWithoutHumanInput
  movies: MovieTransactionUpdateManyInput
  books: BookTransactionUpdateManyInput
  father: HumanUpdateOneWithoutFatherInput
  mother: HumanUpdateOneWithoutMotherInput
  siblings: HumanUpdateManyWithoutSiblingsInput
  aunts: HumanUpdateManyWithoutAuntsInput
  uncles: HumanUpdateManyWithoutUnclesInput
  grandparents: HumanUpdateManyWithoutGrandparentsInput
  great_grandparents: HumanUpdateManyWithoutGreat_grandparentsInput
  friends: HumanUpdateManyWithoutFriendsInput
  acquaintances: HumanUpdateManyWithoutAcquaintancesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemUpdateManyWithoutHumanInput
  directed: MovieUpdateManyWithoutDirectorInput
  acted_in: MovieUpdateManyWithoutActorsInput
}

input HumanUpdateWithoutContactDataInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteUpdateManyInput
  wish_list: GoodOrServiceUpdateManyInput
  education: EducationUpdateOneInput
  tasks: TaskUpdateManyInput
  tv_shows: TvEpisodeTransactionUpdateManyWithoutHumanInput
  movies: MovieTransactionUpdateManyInput
  books: BookTransactionUpdateManyInput
  father: HumanUpdateOneWithoutFatherInput
  mother: HumanUpdateOneWithoutMotherInput
  siblings: HumanUpdateManyWithoutSiblingsInput
  aunts: HumanUpdateManyWithoutAuntsInput
  uncles: HumanUpdateManyWithoutUnclesInput
  grandparents: HumanUpdateManyWithoutGrandparentsInput
  great_grandparents: HumanUpdateManyWithoutGreat_grandparentsInput
  friends: HumanUpdateManyWithoutFriendsInput
  acquaintances: HumanUpdateManyWithoutAcquaintancesInput
  colleagues: HumanUpdateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemUpdateManyWithoutHumanInput
  directed: MovieUpdateManyWithoutDirectorInput
  acted_in: MovieUpdateManyWithoutActorsInput
}

input HumanUpdateWithoutDirectedDataInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteUpdateManyInput
  wish_list: GoodOrServiceUpdateManyInput
  contact: ContactInfoUpdateOneWithoutHumanInput
  education: EducationUpdateOneInput
  tasks: TaskUpdateManyInput
  tv_shows: TvEpisodeTransactionUpdateManyWithoutHumanInput
  movies: MovieTransactionUpdateManyInput
  books: BookTransactionUpdateManyInput
  father: HumanUpdateOneWithoutFatherInput
  mother: HumanUpdateOneWithoutMotherInput
  siblings: HumanUpdateManyWithoutSiblingsInput
  aunts: HumanUpdateManyWithoutAuntsInput
  uncles: HumanUpdateManyWithoutUnclesInput
  grandparents: HumanUpdateManyWithoutGrandparentsInput
  great_grandparents: HumanUpdateManyWithoutGreat_grandparentsInput
  friends: HumanUpdateManyWithoutFriendsInput
  acquaintances: HumanUpdateManyWithoutAcquaintancesInput
  colleagues: HumanUpdateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemUpdateManyWithoutHumanInput
  acted_in: MovieUpdateManyWithoutActorsInput
}

input HumanUpdateWithoutFatherDataInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteUpdateManyInput
  wish_list: GoodOrServiceUpdateManyInput
  contact: ContactInfoUpdateOneWithoutHumanInput
  education: EducationUpdateOneInput
  tasks: TaskUpdateManyInput
  tv_shows: TvEpisodeTransactionUpdateManyWithoutHumanInput
  movies: MovieTransactionUpdateManyInput
  books: BookTransactionUpdateManyInput
  mother: HumanUpdateOneWithoutMotherInput
  siblings: HumanUpdateManyWithoutSiblingsInput
  aunts: HumanUpdateManyWithoutAuntsInput
  uncles: HumanUpdateManyWithoutUnclesInput
  grandparents: HumanUpdateManyWithoutGrandparentsInput
  great_grandparents: HumanUpdateManyWithoutGreat_grandparentsInput
  friends: HumanUpdateManyWithoutFriendsInput
  acquaintances: HumanUpdateManyWithoutAcquaintancesInput
  colleagues: HumanUpdateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemUpdateManyWithoutHumanInput
  directed: MovieUpdateManyWithoutDirectorInput
  acted_in: MovieUpdateManyWithoutActorsInput
}

input HumanUpdateWithoutFriendsDataInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteUpdateManyInput
  wish_list: GoodOrServiceUpdateManyInput
  contact: ContactInfoUpdateOneWithoutHumanInput
  education: EducationUpdateOneInput
  tasks: TaskUpdateManyInput
  tv_shows: TvEpisodeTransactionUpdateManyWithoutHumanInput
  movies: MovieTransactionUpdateManyInput
  books: BookTransactionUpdateManyInput
  father: HumanUpdateOneWithoutFatherInput
  mother: HumanUpdateOneWithoutMotherInput
  siblings: HumanUpdateManyWithoutSiblingsInput
  aunts: HumanUpdateManyWithoutAuntsInput
  uncles: HumanUpdateManyWithoutUnclesInput
  grandparents: HumanUpdateManyWithoutGrandparentsInput
  great_grandparents: HumanUpdateManyWithoutGreat_grandparentsInput
  acquaintances: HumanUpdateManyWithoutAcquaintancesInput
  colleagues: HumanUpdateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemUpdateManyWithoutHumanInput
  directed: MovieUpdateManyWithoutDirectorInput
  acted_in: MovieUpdateManyWithoutActorsInput
}

input HumanUpdateWithoutGrandparentsDataInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteUpdateManyInput
  wish_list: GoodOrServiceUpdateManyInput
  contact: ContactInfoUpdateOneWithoutHumanInput
  education: EducationUpdateOneInput
  tasks: TaskUpdateManyInput
  tv_shows: TvEpisodeTransactionUpdateManyWithoutHumanInput
  movies: MovieTransactionUpdateManyInput
  books: BookTransactionUpdateManyInput
  father: HumanUpdateOneWithoutFatherInput
  mother: HumanUpdateOneWithoutMotherInput
  siblings: HumanUpdateManyWithoutSiblingsInput
  aunts: HumanUpdateManyWithoutAuntsInput
  uncles: HumanUpdateManyWithoutUnclesInput
  great_grandparents: HumanUpdateManyWithoutGreat_grandparentsInput
  friends: HumanUpdateManyWithoutFriendsInput
  acquaintances: HumanUpdateManyWithoutAcquaintancesInput
  colleagues: HumanUpdateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemUpdateManyWithoutHumanInput
  directed: MovieUpdateManyWithoutDirectorInput
  acted_in: MovieUpdateManyWithoutActorsInput
}

input HumanUpdateWithoutGreat_grandparentsDataInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteUpdateManyInput
  wish_list: GoodOrServiceUpdateManyInput
  contact: ContactInfoUpdateOneWithoutHumanInput
  education: EducationUpdateOneInput
  tasks: TaskUpdateManyInput
  tv_shows: TvEpisodeTransactionUpdateManyWithoutHumanInput
  movies: MovieTransactionUpdateManyInput
  books: BookTransactionUpdateManyInput
  father: HumanUpdateOneWithoutFatherInput
  mother: HumanUpdateOneWithoutMotherInput
  siblings: HumanUpdateManyWithoutSiblingsInput
  aunts: HumanUpdateManyWithoutAuntsInput
  uncles: HumanUpdateManyWithoutUnclesInput
  grandparents: HumanUpdateManyWithoutGrandparentsInput
  friends: HumanUpdateManyWithoutFriendsInput
  acquaintances: HumanUpdateManyWithoutAcquaintancesInput
  colleagues: HumanUpdateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemUpdateManyWithoutHumanInput
  directed: MovieUpdateManyWithoutDirectorInput
  acted_in: MovieUpdateManyWithoutActorsInput
}

input HumanUpdateWithoutMotherDataInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteUpdateManyInput
  wish_list: GoodOrServiceUpdateManyInput
  contact: ContactInfoUpdateOneWithoutHumanInput
  education: EducationUpdateOneInput
  tasks: TaskUpdateManyInput
  tv_shows: TvEpisodeTransactionUpdateManyWithoutHumanInput
  movies: MovieTransactionUpdateManyInput
  books: BookTransactionUpdateManyInput
  father: HumanUpdateOneWithoutFatherInput
  siblings: HumanUpdateManyWithoutSiblingsInput
  aunts: HumanUpdateManyWithoutAuntsInput
  uncles: HumanUpdateManyWithoutUnclesInput
  grandparents: HumanUpdateManyWithoutGrandparentsInput
  great_grandparents: HumanUpdateManyWithoutGreat_grandparentsInput
  friends: HumanUpdateManyWithoutFriendsInput
  acquaintances: HumanUpdateManyWithoutAcquaintancesInput
  colleagues: HumanUpdateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemUpdateManyWithoutHumanInput
  directed: MovieUpdateManyWithoutDirectorInput
  acted_in: MovieUpdateManyWithoutActorsInput
}

input HumanUpdateWithoutSiblingsDataInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteUpdateManyInput
  wish_list: GoodOrServiceUpdateManyInput
  contact: ContactInfoUpdateOneWithoutHumanInput
  education: EducationUpdateOneInput
  tasks: TaskUpdateManyInput
  tv_shows: TvEpisodeTransactionUpdateManyWithoutHumanInput
  movies: MovieTransactionUpdateManyInput
  books: BookTransactionUpdateManyInput
  father: HumanUpdateOneWithoutFatherInput
  mother: HumanUpdateOneWithoutMotherInput
  aunts: HumanUpdateManyWithoutAuntsInput
  uncles: HumanUpdateManyWithoutUnclesInput
  grandparents: HumanUpdateManyWithoutGrandparentsInput
  great_grandparents: HumanUpdateManyWithoutGreat_grandparentsInput
  friends: HumanUpdateManyWithoutFriendsInput
  acquaintances: HumanUpdateManyWithoutAcquaintancesInput
  colleagues: HumanUpdateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemUpdateManyWithoutHumanInput
  directed: MovieUpdateManyWithoutDirectorInput
  acted_in: MovieUpdateManyWithoutActorsInput
}

input HumanUpdateWithoutTv_showsDataInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteUpdateManyInput
  wish_list: GoodOrServiceUpdateManyInput
  contact: ContactInfoUpdateOneWithoutHumanInput
  education: EducationUpdateOneInput
  tasks: TaskUpdateManyInput
  movies: MovieTransactionUpdateManyInput
  books: BookTransactionUpdateManyInput
  father: HumanUpdateOneWithoutFatherInput
  mother: HumanUpdateOneWithoutMotherInput
  siblings: HumanUpdateManyWithoutSiblingsInput
  aunts: HumanUpdateManyWithoutAuntsInput
  uncles: HumanUpdateManyWithoutUnclesInput
  grandparents: HumanUpdateManyWithoutGrandparentsInput
  great_grandparents: HumanUpdateManyWithoutGreat_grandparentsInput
  friends: HumanUpdateManyWithoutFriendsInput
  acquaintances: HumanUpdateManyWithoutAcquaintancesInput
  colleagues: HumanUpdateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemUpdateManyWithoutHumanInput
  directed: MovieUpdateManyWithoutDirectorInput
  acted_in: MovieUpdateManyWithoutActorsInput
}

input HumanUpdateWithoutUnclesDataInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteUpdateManyInput
  wish_list: GoodOrServiceUpdateManyInput
  contact: ContactInfoUpdateOneWithoutHumanInput
  education: EducationUpdateOneInput
  tasks: TaskUpdateManyInput
  tv_shows: TvEpisodeTransactionUpdateManyWithoutHumanInput
  movies: MovieTransactionUpdateManyInput
  books: BookTransactionUpdateManyInput
  father: HumanUpdateOneWithoutFatherInput
  mother: HumanUpdateOneWithoutMotherInput
  siblings: HumanUpdateManyWithoutSiblingsInput
  aunts: HumanUpdateManyWithoutAuntsInput
  grandparents: HumanUpdateManyWithoutGrandparentsInput
  great_grandparents: HumanUpdateManyWithoutGreat_grandparentsInput
  friends: HumanUpdateManyWithoutFriendsInput
  acquaintances: HumanUpdateManyWithoutAcquaintancesInput
  colleagues: HumanUpdateManyWithoutColleaguesInput
  height: Float
  weight: Float
  weight_history: WeightHistoryItemUpdateManyWithoutHumanInput
  directed: MovieUpdateManyWithoutDirectorInput
  acted_in: MovieUpdateManyWithoutActorsInput
}

input HumanUpdateWithoutWeight_historyDataInput {
  first_name: String
  last_name: String
  middle_name: String
  birthday: String
  favorites: FavoriteUpdateManyInput
  wish_list: GoodOrServiceUpdateManyInput
  contact: ContactInfoUpdateOneWithoutHumanInput
  education: EducationUpdateOneInput
  tasks: TaskUpdateManyInput
  tv_shows: TvEpisodeTransactionUpdateManyWithoutHumanInput
  movies: MovieTransactionUpdateManyInput
  books: BookTransactionUpdateManyInput
  father: HumanUpdateOneWithoutFatherInput
  mother: HumanUpdateOneWithoutMotherInput
  siblings: HumanUpdateManyWithoutSiblingsInput
  aunts: HumanUpdateManyWithoutAuntsInput
  uncles: HumanUpdateManyWithoutUnclesInput
  grandparents: HumanUpdateManyWithoutGrandparentsInput
  great_grandparents: HumanUpdateManyWithoutGreat_grandparentsInput
  friends: HumanUpdateManyWithoutFriendsInput
  acquaintances: HumanUpdateManyWithoutAcquaintancesInput
  colleagues: HumanUpdateManyWithoutColleaguesInput
  height: Float
  weight: Float
  directed: MovieUpdateManyWithoutDirectorInput
  acted_in: MovieUpdateManyWithoutActorsInput
}

input HumanUpdateWithWhereUniqueNestedInput {
  where: HumanWhereUniqueInput!
  data: HumanUpdateDataInput!
}

input HumanUpdateWithWhereUniqueWithoutAcquaintancesInput {
  where: HumanWhereUniqueInput!
  data: HumanUpdateWithoutAcquaintancesDataInput!
}

input HumanUpdateWithWhereUniqueWithoutActed_inInput {
  where: HumanWhereUniqueInput!
  data: HumanUpdateWithoutActed_inDataInput!
}

input HumanUpdateWithWhereUniqueWithoutAuntsInput {
  where: HumanWhereUniqueInput!
  data: HumanUpdateWithoutAuntsDataInput!
}

input HumanUpdateWithWhereUniqueWithoutColleaguesInput {
  where: HumanWhereUniqueInput!
  data: HumanUpdateWithoutColleaguesDataInput!
}

input HumanUpdateWithWhereUniqueWithoutFriendsInput {
  where: HumanWhereUniqueInput!
  data: HumanUpdateWithoutFriendsDataInput!
}

input HumanUpdateWithWhereUniqueWithoutGrandparentsInput {
  where: HumanWhereUniqueInput!
  data: HumanUpdateWithoutGrandparentsDataInput!
}

input HumanUpdateWithWhereUniqueWithoutGreat_grandparentsInput {
  where: HumanWhereUniqueInput!
  data: HumanUpdateWithoutGreat_grandparentsDataInput!
}

input HumanUpdateWithWhereUniqueWithoutSiblingsInput {
  where: HumanWhereUniqueInput!
  data: HumanUpdateWithoutSiblingsDataInput!
}

input HumanUpdateWithWhereUniqueWithoutUnclesInput {
  where: HumanWhereUniqueInput!
  data: HumanUpdateWithoutUnclesDataInput!
}

input HumanUpsertNestedInput {
  update: HumanUpdateDataInput!
  create: HumanCreateInput!
}

input HumanUpsertWithoutContactInput {
  update: HumanUpdateWithoutContactDataInput!
  create: HumanCreateWithoutContactInput!
}

input HumanUpsertWithoutDirectedInput {
  update: HumanUpdateWithoutDirectedDataInput!
  create: HumanCreateWithoutDirectedInput!
}

input HumanUpsertWithoutFatherInput {
  update: HumanUpdateWithoutFatherDataInput!
  create: HumanCreateWithoutFatherInput!
}

input HumanUpsertWithoutMotherInput {
  update: HumanUpdateWithoutMotherDataInput!
  create: HumanCreateWithoutMotherInput!
}

input HumanUpsertWithoutTv_showsInput {
  update: HumanUpdateWithoutTv_showsDataInput!
  create: HumanCreateWithoutTv_showsInput!
}

input HumanUpsertWithoutWeight_historyInput {
  update: HumanUpdateWithoutWeight_historyDataInput!
  create: HumanCreateWithoutWeight_historyInput!
}

input HumanUpsertWithWhereUniqueNestedInput {
  where: HumanWhereUniqueInput!
  update: HumanUpdateDataInput!
  create: HumanCreateInput!
}

input HumanUpsertWithWhereUniqueWithoutAcquaintancesInput {
  where: HumanWhereUniqueInput!
  update: HumanUpdateWithoutAcquaintancesDataInput!
  create: HumanCreateWithoutAcquaintancesInput!
}

input HumanUpsertWithWhereUniqueWithoutActed_inInput {
  where: HumanWhereUniqueInput!
  update: HumanUpdateWithoutActed_inDataInput!
  create: HumanCreateWithoutActed_inInput!
}

input HumanUpsertWithWhereUniqueWithoutAuntsInput {
  where: HumanWhereUniqueInput!
  update: HumanUpdateWithoutAuntsDataInput!
  create: HumanCreateWithoutAuntsInput!
}

input HumanUpsertWithWhereUniqueWithoutColleaguesInput {
  where: HumanWhereUniqueInput!
  update: HumanUpdateWithoutColleaguesDataInput!
  create: HumanCreateWithoutColleaguesInput!
}

input HumanUpsertWithWhereUniqueWithoutFriendsInput {
  where: HumanWhereUniqueInput!
  update: HumanUpdateWithoutFriendsDataInput!
  create: HumanCreateWithoutFriendsInput!
}

input HumanUpsertWithWhereUniqueWithoutGrandparentsInput {
  where: HumanWhereUniqueInput!
  update: HumanUpdateWithoutGrandparentsDataInput!
  create: HumanCreateWithoutGrandparentsInput!
}

input HumanUpsertWithWhereUniqueWithoutGreat_grandparentsInput {
  where: HumanWhereUniqueInput!
  update: HumanUpdateWithoutGreat_grandparentsDataInput!
  create: HumanCreateWithoutGreat_grandparentsInput!
}

input HumanUpsertWithWhereUniqueWithoutSiblingsInput {
  where: HumanWhereUniqueInput!
  update: HumanUpdateWithoutSiblingsDataInput!
  create: HumanCreateWithoutSiblingsInput!
}

input HumanUpsertWithWhereUniqueWithoutUnclesInput {
  where: HumanWhereUniqueInput!
  update: HumanUpdateWithoutUnclesDataInput!
  create: HumanCreateWithoutUnclesInput!
}

input HumanWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  first_name: String
  first_name_not: String
  first_name_in: [String!]
  first_name_not_in: [String!]
  first_name_lt: String
  first_name_lte: String
  first_name_gt: String
  first_name_gte: String
  first_name_contains: String
  first_name_not_contains: String
  first_name_starts_with: String
  first_name_not_starts_with: String
  first_name_ends_with: String
  first_name_not_ends_with: String
  last_name: String
  last_name_not: String
  last_name_in: [String!]
  last_name_not_in: [String!]
  last_name_lt: String
  last_name_lte: String
  last_name_gt: String
  last_name_gte: String
  last_name_contains: String
  last_name_not_contains: String
  last_name_starts_with: String
  last_name_not_starts_with: String
  last_name_ends_with: String
  last_name_not_ends_with: String
  middle_name: String
  middle_name_not: String
  middle_name_in: [String!]
  middle_name_not_in: [String!]
  middle_name_lt: String
  middle_name_lte: String
  middle_name_gt: String
  middle_name_gte: String
  middle_name_contains: String
  middle_name_not_contains: String
  middle_name_starts_with: String
  middle_name_not_starts_with: String
  middle_name_ends_with: String
  middle_name_not_ends_with: String
  birthday: String
  birthday_not: String
  birthday_in: [String!]
  birthday_not_in: [String!]
  birthday_lt: String
  birthday_lte: String
  birthday_gt: String
  birthday_gte: String
  birthday_contains: String
  birthday_not_contains: String
  birthday_starts_with: String
  birthday_not_starts_with: String
  birthday_ends_with: String
  birthday_not_ends_with: String
  favorites_every: FavoriteWhereInput
  favorites_some: FavoriteWhereInput
  favorites_none: FavoriteWhereInput
  wish_list_every: GoodOrServiceWhereInput
  wish_list_some: GoodOrServiceWhereInput
  wish_list_none: GoodOrServiceWhereInput
  contact: ContactInfoWhereInput
  education: EducationWhereInput
  tasks_every: TaskWhereInput
  tasks_some: TaskWhereInput
  tasks_none: TaskWhereInput
  tv_shows_every: TvEpisodeTransactionWhereInput
  tv_shows_some: TvEpisodeTransactionWhereInput
  tv_shows_none: TvEpisodeTransactionWhereInput
  movies_every: MovieTransactionWhereInput
  movies_some: MovieTransactionWhereInput
  movies_none: MovieTransactionWhereInput
  books_every: BookTransactionWhereInput
  books_some: BookTransactionWhereInput
  books_none: BookTransactionWhereInput
  father: HumanWhereInput
  mother: HumanWhereInput
  siblings_every: HumanWhereInput
  siblings_some: HumanWhereInput
  siblings_none: HumanWhereInput
  aunts_every: HumanWhereInput
  aunts_some: HumanWhereInput
  aunts_none: HumanWhereInput
  uncles_every: HumanWhereInput
  uncles_some: HumanWhereInput
  uncles_none: HumanWhereInput
  grandparents_every: HumanWhereInput
  grandparents_some: HumanWhereInput
  grandparents_none: HumanWhereInput
  great_grandparents_every: HumanWhereInput
  great_grandparents_some: HumanWhereInput
  great_grandparents_none: HumanWhereInput
  friends_every: HumanWhereInput
  friends_some: HumanWhereInput
  friends_none: HumanWhereInput
  acquaintances_every: HumanWhereInput
  acquaintances_some: HumanWhereInput
  acquaintances_none: HumanWhereInput
  colleagues_every: HumanWhereInput
  colleagues_some: HumanWhereInput
  colleagues_none: HumanWhereInput
  height: Float
  height_not: Float
  height_in: [Float!]
  height_not_in: [Float!]
  height_lt: Float
  height_lte: Float
  height_gt: Float
  height_gte: Float
  weight: Float
  weight_not: Float
  weight_in: [Float!]
  weight_not_in: [Float!]
  weight_lt: Float
  weight_lte: Float
  weight_gt: Float
  weight_gte: Float
  weight_history_every: WeightHistoryItemWhereInput
  weight_history_some: WeightHistoryItemWhereInput
  weight_history_none: WeightHistoryItemWhereInput
  directed_every: MovieWhereInput
  directed_some: MovieWhereInput
  directed_none: MovieWhereInput
  acted_in_every: MovieWhereInput
  acted_in_some: MovieWhereInput
  acted_in_none: MovieWhereInput
  AND: [HumanWhereInput!]
  OR: [HumanWhereInput!]
  NOT: [HumanWhereInput!]
}

input HumanWhereUniqueInput {
  id: ID
}

type Location {
  longitude: Float!
  latitude: Float!
  address: String!
  type: String
  name: String!
  events(where: EventWhereInput, orderBy: EventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Event!]
}

type LocationConnection {
  pageInfo: PageInfo!
  edges: [LocationEdge]!
  aggregate: AggregateLocation!
}

input LocationCreateInput {
  longitude: Float!
  latitude: Float!
  address: String!
  type: String
  name: String!
  events: EventCreateManyWithoutLocationInput
}

input LocationCreateOneInput {
  create: LocationCreateInput
}

input LocationCreateOneWithoutEventsInput {
  create: LocationCreateWithoutEventsInput
}

input LocationCreateWithoutEventsInput {
  longitude: Float!
  latitude: Float!
  address: String!
  type: String
  name: String!
}

type LocationEdge {
  node: Location!
  cursor: String!
}

enum LocationOrderByInput {
  longitude_ASC
  longitude_DESC
  latitude_ASC
  latitude_DESC
  address_ASC
  address_DESC
  type_ASC
  type_DESC
  name_ASC
  name_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type LocationPreviousValues {
  longitude: Float!
  latitude: Float!
  address: String!
  type: String
  name: String!
}

type LocationSubscriptionPayload {
  mutation: MutationType!
  node: Location
  updatedFields: [String!]
  previousValues: LocationPreviousValues
}

input LocationSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: LocationWhereInput
  AND: [LocationSubscriptionWhereInput!]
  OR: [LocationSubscriptionWhereInput!]
  NOT: [LocationSubscriptionWhereInput!]
}

input LocationUpdateDataInput {
  longitude: Float
  latitude: Float
  address: String
  type: String
  name: String
  events: EventUpdateManyWithoutLocationInput
}

input LocationUpdateInput {
  longitude: Float
  latitude: Float
  address: String
  type: String
  name: String
  events: EventUpdateManyWithoutLocationInput
}

input LocationUpdateOneInput {
  create: LocationCreateInput
  update: LocationUpdateDataInput
  upsert: LocationUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
}

input LocationUpdateOneRequiredWithoutEventsInput {
  create: LocationCreateWithoutEventsInput
  update: LocationUpdateWithoutEventsDataInput
  upsert: LocationUpsertWithoutEventsInput
}

input LocationUpdateWithoutEventsDataInput {
  longitude: Float
  latitude: Float
  address: String
  type: String
  name: String
}

input LocationUpsertNestedInput {
  update: LocationUpdateDataInput!
  create: LocationCreateInput!
}

input LocationUpsertWithoutEventsInput {
  update: LocationUpdateWithoutEventsDataInput!
  create: LocationCreateWithoutEventsInput!
}

input LocationWhereInput {
  longitude: Float
  longitude_not: Float
  longitude_in: [Float!]
  longitude_not_in: [Float!]
  longitude_lt: Float
  longitude_lte: Float
  longitude_gt: Float
  longitude_gte: Float
  latitude: Float
  latitude_not: Float
  latitude_in: [Float!]
  latitude_not_in: [Float!]
  latitude_lt: Float
  latitude_lte: Float
  latitude_gt: Float
  latitude_gte: Float
  address: String
  address_not: String
  address_in: [String!]
  address_not_in: [String!]
  address_lt: String
  address_lte: String
  address_gt: String
  address_gte: String
  address_contains: String
  address_not_contains: String
  address_starts_with: String
  address_not_starts_with: String
  address_ends_with: String
  address_not_ends_with: String
  type: String
  type_not: String
  type_in: [String!]
  type_not_in: [String!]
  type_lt: String
  type_lte: String
  type_gt: String
  type_gte: String
  type_contains: String
  type_not_contains: String
  type_starts_with: String
  type_not_starts_with: String
  type_ends_with: String
  type_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  events_every: EventWhereInput
  events_some: EventWhereInput
  events_none: EventWhereInput
  AND: [LocationWhereInput!]
  OR: [LocationWhereInput!]
  NOT: [LocationWhereInput!]
}

scalar Long

type Movie {
  id: ID!
  name: String
  category: String
  release_date: DateTime!
  director: Human
  actors(where: HumanWhereInput, orderBy: HumanOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Human!]
}

type MovieConnection {
  pageInfo: PageInfo!
  edges: [MovieEdge]!
  aggregate: AggregateMovie!
}

input MovieCreateInput {
  name: String
  category: String
  release_date: DateTime!
  director: HumanCreateOneWithoutDirectedInput
  actors: HumanCreateManyWithoutActed_inInput
}

input MovieCreateManyWithoutActorsInput {
  create: [MovieCreateWithoutActorsInput!]
  connect: [MovieWhereUniqueInput!]
}

input MovieCreateManyWithoutDirectorInput {
  create: [MovieCreateWithoutDirectorInput!]
  connect: [MovieWhereUniqueInput!]
}

input MovieCreateOneInput {
  create: MovieCreateInput
  connect: MovieWhereUniqueInput
}

input MovieCreateWithoutActorsInput {
  name: String
  category: String
  release_date: DateTime!
  director: HumanCreateOneWithoutDirectedInput
}

input MovieCreateWithoutDirectorInput {
  name: String
  category: String
  release_date: DateTime!
  actors: HumanCreateManyWithoutActed_inInput
}

type MovieEdge {
  node: Movie!
  cursor: String!
}

enum MovieOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  category_ASC
  category_DESC
  release_date_ASC
  release_date_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type MoviePreviousValues {
  id: ID!
  name: String
  category: String
  release_date: DateTime!
}

type MovieSubscriptionPayload {
  mutation: MutationType!
  node: Movie
  updatedFields: [String!]
  previousValues: MoviePreviousValues
}

input MovieSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: MovieWhereInput
  AND: [MovieSubscriptionWhereInput!]
  OR: [MovieSubscriptionWhereInput!]
  NOT: [MovieSubscriptionWhereInput!]
}

type MovieTransaction {
  id: ID!
  movie: Movie!
  date_watched: DateTime!
}

type MovieTransactionConnection {
  pageInfo: PageInfo!
  edges: [MovieTransactionEdge]!
  aggregate: AggregateMovieTransaction!
}

input MovieTransactionCreateInput {
  movie: MovieCreateOneInput!
  date_watched: DateTime!
}

input MovieTransactionCreateManyInput {
  create: [MovieTransactionCreateInput!]
  connect: [MovieTransactionWhereUniqueInput!]
}

type MovieTransactionEdge {
  node: MovieTransaction!
  cursor: String!
}

enum MovieTransactionOrderByInput {
  id_ASC
  id_DESC
  date_watched_ASC
  date_watched_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type MovieTransactionPreviousValues {
  id: ID!
  date_watched: DateTime!
}

type MovieTransactionSubscriptionPayload {
  mutation: MutationType!
  node: MovieTransaction
  updatedFields: [String!]
  previousValues: MovieTransactionPreviousValues
}

input MovieTransactionSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: MovieTransactionWhereInput
  AND: [MovieTransactionSubscriptionWhereInput!]
  OR: [MovieTransactionSubscriptionWhereInput!]
  NOT: [MovieTransactionSubscriptionWhereInput!]
}

input MovieTransactionUpdateDataInput {
  movie: MovieUpdateOneRequiredInput
  date_watched: DateTime
}

input MovieTransactionUpdateInput {
  movie: MovieUpdateOneRequiredInput
  date_watched: DateTime
}

input MovieTransactionUpdateManyInput {
  create: [MovieTransactionCreateInput!]
  delete: [MovieTransactionWhereUniqueInput!]
  connect: [MovieTransactionWhereUniqueInput!]
  disconnect: [MovieTransactionWhereUniqueInput!]
  update: [MovieTransactionUpdateWithWhereUniqueNestedInput!]
  upsert: [MovieTransactionUpsertWithWhereUniqueNestedInput!]
}

input MovieTransactionUpdateWithWhereUniqueNestedInput {
  where: MovieTransactionWhereUniqueInput!
  data: MovieTransactionUpdateDataInput!
}

input MovieTransactionUpsertWithWhereUniqueNestedInput {
  where: MovieTransactionWhereUniqueInput!
  update: MovieTransactionUpdateDataInput!
  create: MovieTransactionCreateInput!
}

input MovieTransactionWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  movie: MovieWhereInput
  date_watched: DateTime
  date_watched_not: DateTime
  date_watched_in: [DateTime!]
  date_watched_not_in: [DateTime!]
  date_watched_lt: DateTime
  date_watched_lte: DateTime
  date_watched_gt: DateTime
  date_watched_gte: DateTime
  AND: [MovieTransactionWhereInput!]
  OR: [MovieTransactionWhereInput!]
  NOT: [MovieTransactionWhereInput!]
}

input MovieTransactionWhereUniqueInput {
  id: ID
}

input MovieUpdateDataInput {
  name: String
  category: String
  release_date: DateTime
  director: HumanUpdateOneWithoutDirectedInput
  actors: HumanUpdateManyWithoutActed_inInput
}

input MovieUpdateInput {
  name: String
  category: String
  release_date: DateTime
  director: HumanUpdateOneWithoutDirectedInput
  actors: HumanUpdateManyWithoutActed_inInput
}

input MovieUpdateManyWithoutActorsInput {
  create: [MovieCreateWithoutActorsInput!]
  delete: [MovieWhereUniqueInput!]
  connect: [MovieWhereUniqueInput!]
  disconnect: [MovieWhereUniqueInput!]
  update: [MovieUpdateWithWhereUniqueWithoutActorsInput!]
  upsert: [MovieUpsertWithWhereUniqueWithoutActorsInput!]
}

input MovieUpdateManyWithoutDirectorInput {
  create: [MovieCreateWithoutDirectorInput!]
  delete: [MovieWhereUniqueInput!]
  connect: [MovieWhereUniqueInput!]
  disconnect: [MovieWhereUniqueInput!]
  update: [MovieUpdateWithWhereUniqueWithoutDirectorInput!]
  upsert: [MovieUpsertWithWhereUniqueWithoutDirectorInput!]
}

input MovieUpdateOneRequiredInput {
  create: MovieCreateInput
  update: MovieUpdateDataInput
  upsert: MovieUpsertNestedInput
  connect: MovieWhereUniqueInput
}

input MovieUpdateWithoutActorsDataInput {
  name: String
  category: String
  release_date: DateTime
  director: HumanUpdateOneWithoutDirectedInput
}

input MovieUpdateWithoutDirectorDataInput {
  name: String
  category: String
  release_date: DateTime
  actors: HumanUpdateManyWithoutActed_inInput
}

input MovieUpdateWithWhereUniqueWithoutActorsInput {
  where: MovieWhereUniqueInput!
  data: MovieUpdateWithoutActorsDataInput!
}

input MovieUpdateWithWhereUniqueWithoutDirectorInput {
  where: MovieWhereUniqueInput!
  data: MovieUpdateWithoutDirectorDataInput!
}

input MovieUpsertNestedInput {
  update: MovieUpdateDataInput!
  create: MovieCreateInput!
}

input MovieUpsertWithWhereUniqueWithoutActorsInput {
  where: MovieWhereUniqueInput!
  update: MovieUpdateWithoutActorsDataInput!
  create: MovieCreateWithoutActorsInput!
}

input MovieUpsertWithWhereUniqueWithoutDirectorInput {
  where: MovieWhereUniqueInput!
  update: MovieUpdateWithoutDirectorDataInput!
  create: MovieCreateWithoutDirectorInput!
}

input MovieWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  category: String
  category_not: String
  category_in: [String!]
  category_not_in: [String!]
  category_lt: String
  category_lte: String
  category_gt: String
  category_gte: String
  category_contains: String
  category_not_contains: String
  category_starts_with: String
  category_not_starts_with: String
  category_ends_with: String
  category_not_ends_with: String
  release_date: DateTime
  release_date_not: DateTime
  release_date_in: [DateTime!]
  release_date_not_in: [DateTime!]
  release_date_lt: DateTime
  release_date_lte: DateTime
  release_date_gt: DateTime
  release_date_gte: DateTime
  director: HumanWhereInput
  actors_every: HumanWhereInput
  actors_some: HumanWhereInput
  actors_none: HumanWhereInput
  AND: [MovieWhereInput!]
  OR: [MovieWhereInput!]
  NOT: [MovieWhereInput!]
}

input MovieWhereUniqueInput {
  id: ID
}

type Mutation {
  createAccount(data: AccountCreateInput!): Account!
  updateAccount(data: AccountUpdateInput!, where: AccountWhereUniqueInput!): Account
  updateManyAccounts(data: AccountUpdateInput!, where: AccountWhereInput): BatchPayload!
  upsertAccount(where: AccountWhereUniqueInput!, create: AccountCreateInput!, update: AccountUpdateInput!): Account!
  deleteAccount(where: AccountWhereUniqueInput!): Account
  deleteManyAccounts(where: AccountWhereInput): BatchPayload!
  createBook(data: BookCreateInput!): Book!
  updateBook(data: BookUpdateInput!, where: BookWhereUniqueInput!): Book
  updateManyBooks(data: BookUpdateInput!, where: BookWhereInput): BatchPayload!
  upsertBook(where: BookWhereUniqueInput!, create: BookCreateInput!, update: BookUpdateInput!): Book!
  deleteBook(where: BookWhereUniqueInput!): Book
  deleteManyBooks(where: BookWhereInput): BatchPayload!
  createBookTransaction(data: BookTransactionCreateInput!): BookTransaction!
  updateBookTransaction(data: BookTransactionUpdateInput!, where: BookTransactionWhereUniqueInput!): BookTransaction
  updateManyBookTransactions(data: BookTransactionUpdateInput!, where: BookTransactionWhereInput): BatchPayload!
  upsertBookTransaction(where: BookTransactionWhereUniqueInput!, create: BookTransactionCreateInput!, update: BookTransactionUpdateInput!): BookTransaction!
  deleteBookTransaction(where: BookTransactionWhereUniqueInput!): BookTransaction
  deleteManyBookTransactions(where: BookTransactionWhereInput): BatchPayload!
  createBudget(data: BudgetCreateInput!): Budget!
  updateBudget(data: BudgetUpdateInput!, where: BudgetWhereUniqueInput!): Budget
  updateManyBudgets(data: BudgetUpdateInput!, where: BudgetWhereInput): BatchPayload!
  upsertBudget(where: BudgetWhereUniqueInput!, create: BudgetCreateInput!, update: BudgetUpdateInput!): Budget!
  deleteBudget(where: BudgetWhereUniqueInput!): Budget
  deleteManyBudgets(where: BudgetWhereInput): BatchPayload!
  createContactInfo(data: ContactInfoCreateInput!): ContactInfo!
  updateManyContactInfoes(data: ContactInfoUpdateInput!, where: ContactInfoWhereInput): BatchPayload!
  deleteManyContactInfoes(where: ContactInfoWhereInput): BatchPayload!
  createCourse(data: CourseCreateInput!): Course!
  updateManyCourses(data: CourseUpdateInput!, where: CourseWhereInput): BatchPayload!
  deleteManyCourses(where: CourseWhereInput): BatchPayload!
  createCourseAssignment(data: CourseAssignmentCreateInput!): CourseAssignment!
  updateCourseAssignment(data: CourseAssignmentUpdateInput!, where: CourseAssignmentWhereUniqueInput!): CourseAssignment
  updateManyCourseAssignments(data: CourseAssignmentUpdateInput!, where: CourseAssignmentWhereInput): BatchPayload!
  upsertCourseAssignment(where: CourseAssignmentWhereUniqueInput!, create: CourseAssignmentCreateInput!, update: CourseAssignmentUpdateInput!): CourseAssignment!
  deleteCourseAssignment(where: CourseAssignmentWhereUniqueInput!): CourseAssignment
  deleteManyCourseAssignments(where: CourseAssignmentWhereInput): BatchPayload!
  createCourseLecture(data: CourseLectureCreateInput!): CourseLecture!
  updateCourseLecture(data: CourseLectureUpdateInput!, where: CourseLectureWhereUniqueInput!): CourseLecture
  updateManyCourseLectures(data: CourseLectureUpdateInput!, where: CourseLectureWhereInput): BatchPayload!
  upsertCourseLecture(where: CourseLectureWhereUniqueInput!, create: CourseLectureCreateInput!, update: CourseLectureUpdateInput!): CourseLecture!
  deleteCourseLecture(where: CourseLectureWhereUniqueInput!): CourseLecture
  deleteManyCourseLectures(where: CourseLectureWhereInput): BatchPayload!
  createEducation(data: EducationCreateInput!): Education!
  updateEducation(data: EducationUpdateInput!, where: EducationWhereUniqueInput!): Education
  updateManyEducations(data: EducationUpdateInput!, where: EducationWhereInput): BatchPayload!
  upsertEducation(where: EducationWhereUniqueInput!, create: EducationCreateInput!, update: EducationUpdateInput!): Education!
  deleteEducation(where: EducationWhereUniqueInput!): Education
  deleteManyEducations(where: EducationWhereInput): BatchPayload!
  createEvent(data: EventCreateInput!): Event!
  updateEvent(data: EventUpdateInput!, where: EventWhereUniqueInput!): Event
  updateManyEvents(data: EventUpdateInput!, where: EventWhereInput): BatchPayload!
  upsertEvent(where: EventWhereUniqueInput!, create: EventCreateInput!, update: EventUpdateInput!): Event!
  deleteEvent(where: EventWhereUniqueInput!): Event
  deleteManyEvents(where: EventWhereInput): BatchPayload!
  createFavorite(data: FavoriteCreateInput!): Favorite!
  updateFavorite(data: FavoriteUpdateInput!, where: FavoriteWhereUniqueInput!): Favorite
  updateManyFavorites(data: FavoriteUpdateInput!, where: FavoriteWhereInput): BatchPayload!
  upsertFavorite(where: FavoriteWhereUniqueInput!, create: FavoriteCreateInput!, update: FavoriteUpdateInput!): Favorite!
  deleteFavorite(where: FavoriteWhereUniqueInput!): Favorite
  deleteManyFavorites(where: FavoriteWhereInput): BatchPayload!
  createFinanceGoals(data: FinanceGoalsCreateInput!): FinanceGoals!
  updateFinanceGoals(data: FinanceGoalsUpdateInput!, where: FinanceGoalsWhereUniqueInput!): FinanceGoals
  updateManyFinanceGoalses(data: FinanceGoalsUpdateInput!, where: FinanceGoalsWhereInput): BatchPayload!
  upsertFinanceGoals(where: FinanceGoalsWhereUniqueInput!, create: FinanceGoalsCreateInput!, update: FinanceGoalsUpdateInput!): FinanceGoals!
  deleteFinanceGoals(where: FinanceGoalsWhereUniqueInput!): FinanceGoals
  deleteManyFinanceGoalses(where: FinanceGoalsWhereInput): BatchPayload!
  createFixedCost(data: FixedCostCreateInput!): FixedCost!
  updateFixedCost(data: FixedCostUpdateInput!, where: FixedCostWhereUniqueInput!): FixedCost
  updateManyFixedCosts(data: FixedCostUpdateInput!, where: FixedCostWhereInput): BatchPayload!
  upsertFixedCost(where: FixedCostWhereUniqueInput!, create: FixedCostCreateInput!, update: FixedCostUpdateInput!): FixedCost!
  deleteFixedCost(where: FixedCostWhereUniqueInput!): FixedCost
  deleteManyFixedCosts(where: FixedCostWhereInput): BatchPayload!
  createGoodOrService(data: GoodOrServiceCreateInput!): GoodOrService!
  updateGoodOrService(data: GoodOrServiceUpdateInput!, where: GoodOrServiceWhereUniqueInput!): GoodOrService
  updateManyGoodOrServices(data: GoodOrServiceUpdateInput!, where: GoodOrServiceWhereInput): BatchPayload!
  upsertGoodOrService(where: GoodOrServiceWhereUniqueInput!, create: GoodOrServiceCreateInput!, update: GoodOrServiceUpdateInput!): GoodOrService!
  deleteGoodOrService(where: GoodOrServiceWhereUniqueInput!): GoodOrService
  deleteManyGoodOrServices(where: GoodOrServiceWhereInput): BatchPayload!
  createHuman(data: HumanCreateInput!): Human!
  updateHuman(data: HumanUpdateInput!, where: HumanWhereUniqueInput!): Human
  updateManyHumans(data: HumanUpdateInput!, where: HumanWhereInput): BatchPayload!
  upsertHuman(where: HumanWhereUniqueInput!, create: HumanCreateInput!, update: HumanUpdateInput!): Human!
  deleteHuman(where: HumanWhereUniqueInput!): Human
  deleteManyHumans(where: HumanWhereInput): BatchPayload!
  createLocation(data: LocationCreateInput!): Location!
  updateManyLocations(data: LocationUpdateInput!, where: LocationWhereInput): BatchPayload!
  deleteManyLocations(where: LocationWhereInput): BatchPayload!
  createMovie(data: MovieCreateInput!): Movie!
  updateMovie(data: MovieUpdateInput!, where: MovieWhereUniqueInput!): Movie
  updateManyMovies(data: MovieUpdateInput!, where: MovieWhereInput): BatchPayload!
  upsertMovie(where: MovieWhereUniqueInput!, create: MovieCreateInput!, update: MovieUpdateInput!): Movie!
  deleteMovie(where: MovieWhereUniqueInput!): Movie
  deleteManyMovies(where: MovieWhereInput): BatchPayload!
  createMovieTransaction(data: MovieTransactionCreateInput!): MovieTransaction!
  updateMovieTransaction(data: MovieTransactionUpdateInput!, where: MovieTransactionWhereUniqueInput!): MovieTransaction
  updateManyMovieTransactions(data: MovieTransactionUpdateInput!, where: MovieTransactionWhereInput): BatchPayload!
  upsertMovieTransaction(where: MovieTransactionWhereUniqueInput!, create: MovieTransactionCreateInput!, update: MovieTransactionUpdateInput!): MovieTransaction!
  deleteMovieTransaction(where: MovieTransactionWhereUniqueInput!): MovieTransaction
  deleteManyMovieTransactions(where: MovieTransactionWhereInput): BatchPayload!
  createOverview(data: OverviewCreateInput!): Overview!
  updateOverview(data: OverviewUpdateInput!, where: OverviewWhereUniqueInput!): Overview
  updateManyOverviews(data: OverviewUpdateInput!, where: OverviewWhereInput): BatchPayload!
  upsertOverview(where: OverviewWhereUniqueInput!, create: OverviewCreateInput!, update: OverviewUpdateInput!): Overview!
  deleteOverview(where: OverviewWhereUniqueInput!): Overview
  deleteManyOverviews(where: OverviewWhereInput): BatchPayload!
  createSchool(data: SchoolCreateInput!): School!
  updateSchool(data: SchoolUpdateInput!, where: SchoolWhereUniqueInput!): School
  updateManySchools(data: SchoolUpdateInput!, where: SchoolWhereInput): BatchPayload!
  upsertSchool(where: SchoolWhereUniqueInput!, create: SchoolCreateInput!, update: SchoolUpdateInput!): School!
  deleteSchool(where: SchoolWhereUniqueInput!): School
  deleteManySchools(where: SchoolWhereInput): BatchPayload!
  createTask(data: TaskCreateInput!): Task!
  updateTask(data: TaskUpdateInput!, where: TaskWhereUniqueInput!): Task
  updateManyTasks(data: TaskUpdateInput!, where: TaskWhereInput): BatchPayload!
  upsertTask(where: TaskWhereUniqueInput!, create: TaskCreateInput!, update: TaskUpdateInput!): Task!
  deleteTask(where: TaskWhereUniqueInput!): Task
  deleteManyTasks(where: TaskWhereInput): BatchPayload!
  createTimeline(data: TimelineCreateInput!): Timeline!
  updateTimeline(data: TimelineUpdateInput!, where: TimelineWhereUniqueInput!): Timeline
  updateManyTimelines(data: TimelineUpdateInput!, where: TimelineWhereInput): BatchPayload!
  upsertTimeline(where: TimelineWhereUniqueInput!, create: TimelineCreateInput!, update: TimelineUpdateInput!): Timeline!
  deleteTimeline(where: TimelineWhereUniqueInput!): Timeline
  deleteManyTimelines(where: TimelineWhereInput): BatchPayload!
  createTransaction(data: TransactionCreateInput!): Transaction!
  updateTransaction(data: TransactionUpdateInput!, where: TransactionWhereUniqueInput!): Transaction
  updateManyTransactions(data: TransactionUpdateInput!, where: TransactionWhereInput): BatchPayload!
  upsertTransaction(where: TransactionWhereUniqueInput!, create: TransactionCreateInput!, update: TransactionUpdateInput!): Transaction!
  deleteTransaction(where: TransactionWhereUniqueInput!): Transaction
  deleteManyTransactions(where: TransactionWhereInput): BatchPayload!
  createTransactionSplit(data: TransactionSplitCreateInput!): TransactionSplit!
  updateManyTransactionSplits(data: TransactionSplitUpdateInput!, where: TransactionSplitWhereInput): BatchPayload!
  deleteManyTransactionSplits(where: TransactionSplitWhereInput): BatchPayload!
  createTvEpisode(data: TvEpisodeCreateInput!): TvEpisode!
  updateTvEpisode(data: TvEpisodeUpdateInput!, where: TvEpisodeWhereUniqueInput!): TvEpisode
  updateManyTvEpisodes(data: TvEpisodeUpdateInput!, where: TvEpisodeWhereInput): BatchPayload!
  upsertTvEpisode(where: TvEpisodeWhereUniqueInput!, create: TvEpisodeCreateInput!, update: TvEpisodeUpdateInput!): TvEpisode!
  deleteTvEpisode(where: TvEpisodeWhereUniqueInput!): TvEpisode
  deleteManyTvEpisodes(where: TvEpisodeWhereInput): BatchPayload!
  createTvEpisodeTransaction(data: TvEpisodeTransactionCreateInput!): TvEpisodeTransaction!
  updateTvEpisodeTransaction(data: TvEpisodeTransactionUpdateInput!, where: TvEpisodeTransactionWhereUniqueInput!): TvEpisodeTransaction
  updateManyTvEpisodeTransactions(data: TvEpisodeTransactionUpdateInput!, where: TvEpisodeTransactionWhereInput): BatchPayload!
  upsertTvEpisodeTransaction(where: TvEpisodeTransactionWhereUniqueInput!, create: TvEpisodeTransactionCreateInput!, update: TvEpisodeTransactionUpdateInput!): TvEpisodeTransaction!
  deleteTvEpisodeTransaction(where: TvEpisodeTransactionWhereUniqueInput!): TvEpisodeTransaction
  deleteManyTvEpisodeTransactions(where: TvEpisodeTransactionWhereInput): BatchPayload!
  createTvShow(data: TvShowCreateInput!): TvShow!
  updateTvShow(data: TvShowUpdateInput!, where: TvShowWhereUniqueInput!): TvShow
  updateManyTvShows(data: TvShowUpdateInput!, where: TvShowWhereInput): BatchPayload!
  upsertTvShow(where: TvShowWhereUniqueInput!, create: TvShowCreateInput!, update: TvShowUpdateInput!): TvShow!
  deleteTvShow(where: TvShowWhereUniqueInput!): TvShow
  deleteManyTvShows(where: TvShowWhereInput): BatchPayload!
  createWeightHistoryItem(data: WeightHistoryItemCreateInput!): WeightHistoryItem!
  updateWeightHistoryItem(data: WeightHistoryItemUpdateInput!, where: WeightHistoryItemWhereUniqueInput!): WeightHistoryItem
  updateManyWeightHistoryItems(data: WeightHistoryItemUpdateInput!, where: WeightHistoryItemWhereInput): BatchPayload!
  upsertWeightHistoryItem(where: WeightHistoryItemWhereUniqueInput!, create: WeightHistoryItemCreateInput!, update: WeightHistoryItemUpdateInput!): WeightHistoryItem!
  deleteWeightHistoryItem(where: WeightHistoryItemWhereUniqueInput!): WeightHistoryItem
  deleteManyWeightHistoryItems(where: WeightHistoryItemWhereInput): BatchPayload!
  createWishList(data: WishListCreateInput!): WishList!
  updateManyWishLists(data: WishListUpdateInput!, where: WishListWhereInput): BatchPayload!
  deleteManyWishLists(where: WishListWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type Overview {
  id: ID!
  net_worth: Float!
  credit_score: Int
  income: Float!
  goals(where: FinanceGoalsWhereInput, orderBy: FinanceGoalsOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [FinanceGoals!]
  budget: Budget
  accounts(where: AccountWhereInput, orderBy: AccountOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Account!]
}

type OverviewConnection {
  pageInfo: PageInfo!
  edges: [OverviewEdge]!
  aggregate: AggregateOverview!
}

input OverviewCreateInput {
  net_worth: Float!
  credit_score: Int
  income: Float!
  goals: FinanceGoalsCreateManyInput
  budget: BudgetCreateOneInput
  accounts: AccountCreateManyInput
}

type OverviewEdge {
  node: Overview!
  cursor: String!
}

enum OverviewOrderByInput {
  id_ASC
  id_DESC
  net_worth_ASC
  net_worth_DESC
  credit_score_ASC
  credit_score_DESC
  income_ASC
  income_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type OverviewPreviousValues {
  id: ID!
  net_worth: Float!
  credit_score: Int
  income: Float!
}

type OverviewSubscriptionPayload {
  mutation: MutationType!
  node: Overview
  updatedFields: [String!]
  previousValues: OverviewPreviousValues
}

input OverviewSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: OverviewWhereInput
  AND: [OverviewSubscriptionWhereInput!]
  OR: [OverviewSubscriptionWhereInput!]
  NOT: [OverviewSubscriptionWhereInput!]
}

input OverviewUpdateInput {
  net_worth: Float
  credit_score: Int
  income: Float
  goals: FinanceGoalsUpdateManyInput
  budget: BudgetUpdateOneInput
  accounts: AccountUpdateManyInput
}

input OverviewWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  net_worth: Float
  net_worth_not: Float
  net_worth_in: [Float!]
  net_worth_not_in: [Float!]
  net_worth_lt: Float
  net_worth_lte: Float
  net_worth_gt: Float
  net_worth_gte: Float
  credit_score: Int
  credit_score_not: Int
  credit_score_in: [Int!]
  credit_score_not_in: [Int!]
  credit_score_lt: Int
  credit_score_lte: Int
  credit_score_gt: Int
  credit_score_gte: Int
  income: Float
  income_not: Float
  income_in: [Float!]
  income_not_in: [Float!]
  income_lt: Float
  income_lte: Float
  income_gt: Float
  income_gte: Float
  goals_every: FinanceGoalsWhereInput
  goals_some: FinanceGoalsWhereInput
  goals_none: FinanceGoalsWhereInput
  budget: BudgetWhereInput
  accounts_every: AccountWhereInput
  accounts_some: AccountWhereInput
  accounts_none: AccountWhereInput
  AND: [OverviewWhereInput!]
  OR: [OverviewWhereInput!]
  NOT: [OverviewWhereInput!]
}

input OverviewWhereUniqueInput {
  id: ID
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  account(where: AccountWhereUniqueInput!): Account
  accounts(where: AccountWhereInput, orderBy: AccountOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Account]!
  accountsConnection(where: AccountWhereInput, orderBy: AccountOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AccountConnection!
  book(where: BookWhereUniqueInput!): Book
  books(where: BookWhereInput, orderBy: BookOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Book]!
  booksConnection(where: BookWhereInput, orderBy: BookOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): BookConnection!
  bookTransaction(where: BookTransactionWhereUniqueInput!): BookTransaction
  bookTransactions(where: BookTransactionWhereInput, orderBy: BookTransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [BookTransaction]!
  bookTransactionsConnection(where: BookTransactionWhereInput, orderBy: BookTransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): BookTransactionConnection!
  budget(where: BudgetWhereUniqueInput!): Budget
  budgets(where: BudgetWhereInput, orderBy: BudgetOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Budget]!
  budgetsConnection(where: BudgetWhereInput, orderBy: BudgetOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): BudgetConnection!
  contactInfoes(where: ContactInfoWhereInput, orderBy: ContactInfoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ContactInfo]!
  contactInfoesConnection(where: ContactInfoWhereInput, orderBy: ContactInfoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ContactInfoConnection!
  courses(where: CourseWhereInput, orderBy: CourseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Course]!
  coursesConnection(where: CourseWhereInput, orderBy: CourseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CourseConnection!
  courseAssignment(where: CourseAssignmentWhereUniqueInput!): CourseAssignment
  courseAssignments(where: CourseAssignmentWhereInput, orderBy: CourseAssignmentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [CourseAssignment]!
  courseAssignmentsConnection(where: CourseAssignmentWhereInput, orderBy: CourseAssignmentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CourseAssignmentConnection!
  courseLecture(where: CourseLectureWhereUniqueInput!): CourseLecture
  courseLectures(where: CourseLectureWhereInput, orderBy: CourseLectureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [CourseLecture]!
  courseLecturesConnection(where: CourseLectureWhereInput, orderBy: CourseLectureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CourseLectureConnection!
  education(where: EducationWhereUniqueInput!): Education
  educations(where: EducationWhereInput, orderBy: EducationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Education]!
  educationsConnection(where: EducationWhereInput, orderBy: EducationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EducationConnection!
  event(where: EventWhereUniqueInput!): Event
  events(where: EventWhereInput, orderBy: EventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Event]!
  eventsConnection(where: EventWhereInput, orderBy: EventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EventConnection!
  favorite(where: FavoriteWhereUniqueInput!): Favorite
  favorites(where: FavoriteWhereInput, orderBy: FavoriteOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Favorite]!
  favoritesConnection(where: FavoriteWhereInput, orderBy: FavoriteOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): FavoriteConnection!
  financeGoals(where: FinanceGoalsWhereUniqueInput!): FinanceGoals
  financeGoalses(where: FinanceGoalsWhereInput, orderBy: FinanceGoalsOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [FinanceGoals]!
  financeGoalsesConnection(where: FinanceGoalsWhereInput, orderBy: FinanceGoalsOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): FinanceGoalsConnection!
  fixedCost(where: FixedCostWhereUniqueInput!): FixedCost
  fixedCosts(where: FixedCostWhereInput, orderBy: FixedCostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [FixedCost]!
  fixedCostsConnection(where: FixedCostWhereInput, orderBy: FixedCostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): FixedCostConnection!
  goodOrService(where: GoodOrServiceWhereUniqueInput!): GoodOrService
  goodOrServices(where: GoodOrServiceWhereInput, orderBy: GoodOrServiceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [GoodOrService]!
  goodOrServicesConnection(where: GoodOrServiceWhereInput, orderBy: GoodOrServiceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): GoodOrServiceConnection!
  human(where: HumanWhereUniqueInput!): Human
  humans(where: HumanWhereInput, orderBy: HumanOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Human]!
  humansConnection(where: HumanWhereInput, orderBy: HumanOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): HumanConnection!
  locations(where: LocationWhereInput, orderBy: LocationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Location]!
  locationsConnection(where: LocationWhereInput, orderBy: LocationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): LocationConnection!
  movie(where: MovieWhereUniqueInput!): Movie
  movies(where: MovieWhereInput, orderBy: MovieOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Movie]!
  moviesConnection(where: MovieWhereInput, orderBy: MovieOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): MovieConnection!
  movieTransaction(where: MovieTransactionWhereUniqueInput!): MovieTransaction
  movieTransactions(where: MovieTransactionWhereInput, orderBy: MovieTransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [MovieTransaction]!
  movieTransactionsConnection(where: MovieTransactionWhereInput, orderBy: MovieTransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): MovieTransactionConnection!
  overview(where: OverviewWhereUniqueInput!): Overview
  overviews(where: OverviewWhereInput, orderBy: OverviewOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Overview]!
  overviewsConnection(where: OverviewWhereInput, orderBy: OverviewOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): OverviewConnection!
  school(where: SchoolWhereUniqueInput!): School
  schools(where: SchoolWhereInput, orderBy: SchoolOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [School]!
  schoolsConnection(where: SchoolWhereInput, orderBy: SchoolOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SchoolConnection!
  task(where: TaskWhereUniqueInput!): Task
  tasks(where: TaskWhereInput, orderBy: TaskOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Task]!
  tasksConnection(where: TaskWhereInput, orderBy: TaskOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TaskConnection!
  timeline(where: TimelineWhereUniqueInput!): Timeline
  timelines(where: TimelineWhereInput, orderBy: TimelineOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Timeline]!
  timelinesConnection(where: TimelineWhereInput, orderBy: TimelineOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TimelineConnection!
  transaction(where: TransactionWhereUniqueInput!): Transaction
  transactions(where: TransactionWhereInput, orderBy: TransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Transaction]!
  transactionsConnection(where: TransactionWhereInput, orderBy: TransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TransactionConnection!
  transactionSplits(where: TransactionSplitWhereInput, orderBy: TransactionSplitOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TransactionSplit]!
  transactionSplitsConnection(where: TransactionSplitWhereInput, orderBy: TransactionSplitOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TransactionSplitConnection!
  tvEpisode(where: TvEpisodeWhereUniqueInput!): TvEpisode
  tvEpisodes(where: TvEpisodeWhereInput, orderBy: TvEpisodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TvEpisode]!
  tvEpisodesConnection(where: TvEpisodeWhereInput, orderBy: TvEpisodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TvEpisodeConnection!
  tvEpisodeTransaction(where: TvEpisodeTransactionWhereUniqueInput!): TvEpisodeTransaction
  tvEpisodeTransactions(where: TvEpisodeTransactionWhereInput, orderBy: TvEpisodeTransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TvEpisodeTransaction]!
  tvEpisodeTransactionsConnection(where: TvEpisodeTransactionWhereInput, orderBy: TvEpisodeTransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TvEpisodeTransactionConnection!
  tvShow(where: TvShowWhereUniqueInput!): TvShow
  tvShows(where: TvShowWhereInput, orderBy: TvShowOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TvShow]!
  tvShowsConnection(where: TvShowWhereInput, orderBy: TvShowOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TvShowConnection!
  weightHistoryItem(where: WeightHistoryItemWhereUniqueInput!): WeightHistoryItem
  weightHistoryItems(where: WeightHistoryItemWhereInput, orderBy: WeightHistoryItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [WeightHistoryItem]!
  weightHistoryItemsConnection(where: WeightHistoryItemWhereInput, orderBy: WeightHistoryItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): WeightHistoryItemConnection!
  wishLists(where: WishListWhereInput, orderBy: WishListOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [WishList]!
  wishListsConnection(where: WishListWhereInput, orderBy: WishListOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): WishListConnection!
  node(id: ID!): Node
}

type School {
  id: ID!
  name: String!
  location: String!
}

type SchoolConnection {
  pageInfo: PageInfo!
  edges: [SchoolEdge]!
  aggregate: AggregateSchool!
}

input SchoolCreateInput {
  name: String!
  location: String!
}

input SchoolCreateManyInput {
  create: [SchoolCreateInput!]
  connect: [SchoolWhereUniqueInput!]
}

input SchoolCreateOneInput {
  create: SchoolCreateInput
  connect: SchoolWhereUniqueInput
}

type SchoolEdge {
  node: School!
  cursor: String!
}

enum SchoolOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  location_ASC
  location_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type SchoolPreviousValues {
  id: ID!
  name: String!
  location: String!
}

type SchoolSubscriptionPayload {
  mutation: MutationType!
  node: School
  updatedFields: [String!]
  previousValues: SchoolPreviousValues
}

input SchoolSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: SchoolWhereInput
  AND: [SchoolSubscriptionWhereInput!]
  OR: [SchoolSubscriptionWhereInput!]
  NOT: [SchoolSubscriptionWhereInput!]
}

input SchoolUpdateDataInput {
  name: String
  location: String
}

input SchoolUpdateInput {
  name: String
  location: String
}

input SchoolUpdateManyInput {
  create: [SchoolCreateInput!]
  delete: [SchoolWhereUniqueInput!]
  connect: [SchoolWhereUniqueInput!]
  disconnect: [SchoolWhereUniqueInput!]
  update: [SchoolUpdateWithWhereUniqueNestedInput!]
  upsert: [SchoolUpsertWithWhereUniqueNestedInput!]
}

input SchoolUpdateOneRequiredInput {
  create: SchoolCreateInput
  update: SchoolUpdateDataInput
  upsert: SchoolUpsertNestedInput
  connect: SchoolWhereUniqueInput
}

input SchoolUpdateWithWhereUniqueNestedInput {
  where: SchoolWhereUniqueInput!
  data: SchoolUpdateDataInput!
}

input SchoolUpsertNestedInput {
  update: SchoolUpdateDataInput!
  create: SchoolCreateInput!
}

input SchoolUpsertWithWhereUniqueNestedInput {
  where: SchoolWhereUniqueInput!
  update: SchoolUpdateDataInput!
  create: SchoolCreateInput!
}

input SchoolWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  location: String
  location_not: String
  location_in: [String!]
  location_not_in: [String!]
  location_lt: String
  location_lte: String
  location_gt: String
  location_gte: String
  location_contains: String
  location_not_contains: String
  location_starts_with: String
  location_not_starts_with: String
  location_ends_with: String
  location_not_ends_with: String
  AND: [SchoolWhereInput!]
  OR: [SchoolWhereInput!]
  NOT: [SchoolWhereInput!]
}

input SchoolWhereUniqueInput {
  id: ID
}

type Subscription {
  account(where: AccountSubscriptionWhereInput): AccountSubscriptionPayload
  book(where: BookSubscriptionWhereInput): BookSubscriptionPayload
  bookTransaction(where: BookTransactionSubscriptionWhereInput): BookTransactionSubscriptionPayload
  budget(where: BudgetSubscriptionWhereInput): BudgetSubscriptionPayload
  contactInfo(where: ContactInfoSubscriptionWhereInput): ContactInfoSubscriptionPayload
  course(where: CourseSubscriptionWhereInput): CourseSubscriptionPayload
  courseAssignment(where: CourseAssignmentSubscriptionWhereInput): CourseAssignmentSubscriptionPayload
  courseLecture(where: CourseLectureSubscriptionWhereInput): CourseLectureSubscriptionPayload
  education(where: EducationSubscriptionWhereInput): EducationSubscriptionPayload
  event(where: EventSubscriptionWhereInput): EventSubscriptionPayload
  favorite(where: FavoriteSubscriptionWhereInput): FavoriteSubscriptionPayload
  financeGoals(where: FinanceGoalsSubscriptionWhereInput): FinanceGoalsSubscriptionPayload
  fixedCost(where: FixedCostSubscriptionWhereInput): FixedCostSubscriptionPayload
  goodOrService(where: GoodOrServiceSubscriptionWhereInput): GoodOrServiceSubscriptionPayload
  human(where: HumanSubscriptionWhereInput): HumanSubscriptionPayload
  location(where: LocationSubscriptionWhereInput): LocationSubscriptionPayload
  movie(where: MovieSubscriptionWhereInput): MovieSubscriptionPayload
  movieTransaction(where: MovieTransactionSubscriptionWhereInput): MovieTransactionSubscriptionPayload
  overview(where: OverviewSubscriptionWhereInput): OverviewSubscriptionPayload
  school(where: SchoolSubscriptionWhereInput): SchoolSubscriptionPayload
  task(where: TaskSubscriptionWhereInput): TaskSubscriptionPayload
  timeline(where: TimelineSubscriptionWhereInput): TimelineSubscriptionPayload
  transaction(where: TransactionSubscriptionWhereInput): TransactionSubscriptionPayload
  transactionSplit(where: TransactionSplitSubscriptionWhereInput): TransactionSplitSubscriptionPayload
  tvEpisode(where: TvEpisodeSubscriptionWhereInput): TvEpisodeSubscriptionPayload
  tvEpisodeTransaction(where: TvEpisodeTransactionSubscriptionWhereInput): TvEpisodeTransactionSubscriptionPayload
  tvShow(where: TvShowSubscriptionWhereInput): TvShowSubscriptionPayload
  weightHistoryItem(where: WeightHistoryItemSubscriptionWhereInput): WeightHistoryItemSubscriptionPayload
  wishList(where: WishListSubscriptionWhereInput): WishListSubscriptionPayload
}

type Task {
  id: ID!
  name: String
  start: DateTime!
  end: DateTime!
  status: TaskStatus
}

type TaskConnection {
  pageInfo: PageInfo!
  edges: [TaskEdge]!
  aggregate: AggregateTask!
}

input TaskCreateInput {
  name: String
  start: DateTime!
  end: DateTime!
  status: TaskStatus
}

input TaskCreateManyInput {
  create: [TaskCreateInput!]
  connect: [TaskWhereUniqueInput!]
}

type TaskEdge {
  node: Task!
  cursor: String!
}

enum TaskOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  start_ASC
  start_DESC
  end_ASC
  end_DESC
  status_ASC
  status_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TaskPreviousValues {
  id: ID!
  name: String
  start: DateTime!
  end: DateTime!
  status: TaskStatus
}

enum TaskStatus {
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

type TaskSubscriptionPayload {
  mutation: MutationType!
  node: Task
  updatedFields: [String!]
  previousValues: TaskPreviousValues
}

input TaskSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TaskWhereInput
  AND: [TaskSubscriptionWhereInput!]
  OR: [TaskSubscriptionWhereInput!]
  NOT: [TaskSubscriptionWhereInput!]
}

input TaskUpdateDataInput {
  name: String
  start: DateTime
  end: DateTime
  status: TaskStatus
}

input TaskUpdateInput {
  name: String
  start: DateTime
  end: DateTime
  status: TaskStatus
}

input TaskUpdateManyInput {
  create: [TaskCreateInput!]
  delete: [TaskWhereUniqueInput!]
  connect: [TaskWhereUniqueInput!]
  disconnect: [TaskWhereUniqueInput!]
  update: [TaskUpdateWithWhereUniqueNestedInput!]
  upsert: [TaskUpsertWithWhereUniqueNestedInput!]
}

input TaskUpdateWithWhereUniqueNestedInput {
  where: TaskWhereUniqueInput!
  data: TaskUpdateDataInput!
}

input TaskUpsertWithWhereUniqueNestedInput {
  where: TaskWhereUniqueInput!
  update: TaskUpdateDataInput!
  create: TaskCreateInput!
}

input TaskWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  start: DateTime
  start_not: DateTime
  start_in: [DateTime!]
  start_not_in: [DateTime!]
  start_lt: DateTime
  start_lte: DateTime
  start_gt: DateTime
  start_gte: DateTime
  end: DateTime
  end_not: DateTime
  end_in: [DateTime!]
  end_not_in: [DateTime!]
  end_lt: DateTime
  end_lte: DateTime
  end_gt: DateTime
  end_gte: DateTime
  status: TaskStatus
  status_not: TaskStatus
  status_in: [TaskStatus!]
  status_not_in: [TaskStatus!]
  AND: [TaskWhereInput!]
  OR: [TaskWhereInput!]
  NOT: [TaskWhereInput!]
}

input TaskWhereUniqueInput {
  id: ID
}

type Timeline {
  id: ID!
  events(where: EventWhereInput, orderBy: EventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Event!]
  belongs_to: Human!
}

type TimelineConnection {
  pageInfo: PageInfo!
  edges: [TimelineEdge]!
  aggregate: AggregateTimeline!
}

input TimelineCreateInput {
  events: EventCreateManyInput
  belongs_to: HumanCreateOneInput!
}

type TimelineEdge {
  node: Timeline!
  cursor: String!
}

enum TimelineOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TimelinePreviousValues {
  id: ID!
}

type TimelineSubscriptionPayload {
  mutation: MutationType!
  node: Timeline
  updatedFields: [String!]
  previousValues: TimelinePreviousValues
}

input TimelineSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TimelineWhereInput
  AND: [TimelineSubscriptionWhereInput!]
  OR: [TimelineSubscriptionWhereInput!]
  NOT: [TimelineSubscriptionWhereInput!]
}

input TimelineUpdateInput {
  events: EventUpdateManyInput
  belongs_to: HumanUpdateOneRequiredInput
}

input TimelineWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  events_every: EventWhereInput
  events_some: EventWhereInput
  events_none: EventWhereInput
  belongs_to: HumanWhereInput
  AND: [TimelineWhereInput!]
  OR: [TimelineWhereInput!]
  NOT: [TimelineWhereInput!]
}

input TimelineWhereUniqueInput {
  id: ID
}

type Transaction {
  id: ID!
  payee: String!
  amount: Float!
  date: String!
  category: String!
  splits(where: TransactionSplitWhereInput, orderBy: TransactionSplitOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TransactionSplit!]
  where: Location
  items(where: GoodOrServiceWhereInput, orderBy: GoodOrServiceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [GoodOrService!]
  with(where: HumanWhereInput, orderBy: HumanOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Human!]
  event: Event
}

type TransactionConnection {
  pageInfo: PageInfo!
  edges: [TransactionEdge]!
  aggregate: AggregateTransaction!
}

input TransactionCreateInput {
  payee: String!
  amount: Float!
  date: String!
  category: String!
  splits: TransactionSplitCreateManyInput
  where: LocationCreateOneInput
  items: GoodOrServiceCreateManyWithoutTransactionInput
  with: HumanCreateManyInput
  event: EventCreateOneInput
}

input TransactionCreateManyInput {
  create: [TransactionCreateInput!]
  connect: [TransactionWhereUniqueInput!]
}

input TransactionCreateOneWithoutItemsInput {
  create: TransactionCreateWithoutItemsInput
  connect: TransactionWhereUniqueInput
}

input TransactionCreateWithoutItemsInput {
  payee: String!
  amount: Float!
  date: String!
  category: String!
  splits: TransactionSplitCreateManyInput
  where: LocationCreateOneInput
  with: HumanCreateManyInput
  event: EventCreateOneInput
}

type TransactionEdge {
  node: Transaction!
  cursor: String!
}

enum TransactionOrderByInput {
  id_ASC
  id_DESC
  payee_ASC
  payee_DESC
  amount_ASC
  amount_DESC
  date_ASC
  date_DESC
  category_ASC
  category_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TransactionPreviousValues {
  id: ID!
  payee: String!
  amount: Float!
  date: String!
  category: String!
}

type TransactionSplit {
  human: Human!
  percentage: Float
  amount: Float
  pending: Boolean
}

type TransactionSplitConnection {
  pageInfo: PageInfo!
  edges: [TransactionSplitEdge]!
  aggregate: AggregateTransactionSplit!
}

input TransactionSplitCreateInput {
  human: HumanCreateOneInput!
  percentage: Float
  amount: Float
  pending: Boolean
}

input TransactionSplitCreateManyInput {
  create: [TransactionSplitCreateInput!]
}

type TransactionSplitEdge {
  node: TransactionSplit!
  cursor: String!
}

enum TransactionSplitOrderByInput {
  percentage_ASC
  percentage_DESC
  amount_ASC
  amount_DESC
  pending_ASC
  pending_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TransactionSplitPreviousValues {
  percentage: Float
  amount: Float
  pending: Boolean
}

type TransactionSplitSubscriptionPayload {
  mutation: MutationType!
  node: TransactionSplit
  updatedFields: [String!]
  previousValues: TransactionSplitPreviousValues
}

input TransactionSplitSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TransactionSplitWhereInput
  AND: [TransactionSplitSubscriptionWhereInput!]
  OR: [TransactionSplitSubscriptionWhereInput!]
  NOT: [TransactionSplitSubscriptionWhereInput!]
}

input TransactionSplitUpdateInput {
  human: HumanUpdateOneRequiredInput
  percentage: Float
  amount: Float
  pending: Boolean
}

input TransactionSplitUpdateManyInput {
  create: [TransactionSplitCreateInput!]
}

input TransactionSplitWhereInput {
  human: HumanWhereInput
  percentage: Float
  percentage_not: Float
  percentage_in: [Float!]
  percentage_not_in: [Float!]
  percentage_lt: Float
  percentage_lte: Float
  percentage_gt: Float
  percentage_gte: Float
  amount: Float
  amount_not: Float
  amount_in: [Float!]
  amount_not_in: [Float!]
  amount_lt: Float
  amount_lte: Float
  amount_gt: Float
  amount_gte: Float
  pending: Boolean
  pending_not: Boolean
  AND: [TransactionSplitWhereInput!]
  OR: [TransactionSplitWhereInput!]
  NOT: [TransactionSplitWhereInput!]
}

type TransactionSubscriptionPayload {
  mutation: MutationType!
  node: Transaction
  updatedFields: [String!]
  previousValues: TransactionPreviousValues
}

input TransactionSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TransactionWhereInput
  AND: [TransactionSubscriptionWhereInput!]
  OR: [TransactionSubscriptionWhereInput!]
  NOT: [TransactionSubscriptionWhereInput!]
}

input TransactionUpdateDataInput {
  payee: String
  amount: Float
  date: String
  category: String
  splits: TransactionSplitUpdateManyInput
  where: LocationUpdateOneInput
  items: GoodOrServiceUpdateManyWithoutTransactionInput
  with: HumanUpdateManyInput
  event: EventUpdateOneInput
}

input TransactionUpdateInput {
  payee: String
  amount: Float
  date: String
  category: String
  splits: TransactionSplitUpdateManyInput
  where: LocationUpdateOneInput
  items: GoodOrServiceUpdateManyWithoutTransactionInput
  with: HumanUpdateManyInput
  event: EventUpdateOneInput
}

input TransactionUpdateManyInput {
  create: [TransactionCreateInput!]
  delete: [TransactionWhereUniqueInput!]
  connect: [TransactionWhereUniqueInput!]
  disconnect: [TransactionWhereUniqueInput!]
  update: [TransactionUpdateWithWhereUniqueNestedInput!]
  upsert: [TransactionUpsertWithWhereUniqueNestedInput!]
}

input TransactionUpdateOneWithoutItemsInput {
  create: TransactionCreateWithoutItemsInput
  update: TransactionUpdateWithoutItemsDataInput
  upsert: TransactionUpsertWithoutItemsInput
  delete: Boolean
  disconnect: Boolean
  connect: TransactionWhereUniqueInput
}

input TransactionUpdateWithoutItemsDataInput {
  payee: String
  amount: Float
  date: String
  category: String
  splits: TransactionSplitUpdateManyInput
  where: LocationUpdateOneInput
  with: HumanUpdateManyInput
  event: EventUpdateOneInput
}

input TransactionUpdateWithWhereUniqueNestedInput {
  where: TransactionWhereUniqueInput!
  data: TransactionUpdateDataInput!
}

input TransactionUpsertWithoutItemsInput {
  update: TransactionUpdateWithoutItemsDataInput!
  create: TransactionCreateWithoutItemsInput!
}

input TransactionUpsertWithWhereUniqueNestedInput {
  where: TransactionWhereUniqueInput!
  update: TransactionUpdateDataInput!
  create: TransactionCreateInput!
}

input TransactionWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  payee: String
  payee_not: String
  payee_in: [String!]
  payee_not_in: [String!]
  payee_lt: String
  payee_lte: String
  payee_gt: String
  payee_gte: String
  payee_contains: String
  payee_not_contains: String
  payee_starts_with: String
  payee_not_starts_with: String
  payee_ends_with: String
  payee_not_ends_with: String
  amount: Float
  amount_not: Float
  amount_in: [Float!]
  amount_not_in: [Float!]
  amount_lt: Float
  amount_lte: Float
  amount_gt: Float
  amount_gte: Float
  date: String
  date_not: String
  date_in: [String!]
  date_not_in: [String!]
  date_lt: String
  date_lte: String
  date_gt: String
  date_gte: String
  date_contains: String
  date_not_contains: String
  date_starts_with: String
  date_not_starts_with: String
  date_ends_with: String
  date_not_ends_with: String
  category: String
  category_not: String
  category_in: [String!]
  category_not_in: [String!]
  category_lt: String
  category_lte: String
  category_gt: String
  category_gte: String
  category_contains: String
  category_not_contains: String
  category_starts_with: String
  category_not_starts_with: String
  category_ends_with: String
  category_not_ends_with: String
  splits_every: TransactionSplitWhereInput
  splits_some: TransactionSplitWhereInput
  splits_none: TransactionSplitWhereInput
  where: LocationWhereInput
  items_every: GoodOrServiceWhereInput
  items_some: GoodOrServiceWhereInput
  items_none: GoodOrServiceWhereInput
  with_every: HumanWhereInput
  with_some: HumanWhereInput
  with_none: HumanWhereInput
  event: EventWhereInput
  AND: [TransactionWhereInput!]
  OR: [TransactionWhereInput!]
  NOT: [TransactionWhereInput!]
}

input TransactionWhereUniqueInput {
  id: ID
}

type TvEpisode {
  id: ID!
  name: String
  episode: Int
  season: Int
  watched: Boolean
  show: TvShow!
  date_watched: DateTime!
  release_date: DateTime!
}

type TvEpisodeConnection {
  pageInfo: PageInfo!
  edges: [TvEpisodeEdge]!
  aggregate: AggregateTvEpisode!
}

input TvEpisodeCreateInput {
  name: String
  episode: Int
  season: Int
  watched: Boolean
  show: TvShowCreateOneWithoutEpisodesInput!
  date_watched: DateTime!
  release_date: DateTime!
}

input TvEpisodeCreateManyWithoutShowInput {
  create: [TvEpisodeCreateWithoutShowInput!]
  connect: [TvEpisodeWhereUniqueInput!]
}

input TvEpisodeCreateOneInput {
  create: TvEpisodeCreateInput
  connect: TvEpisodeWhereUniqueInput
}

input TvEpisodeCreateWithoutShowInput {
  name: String
  episode: Int
  season: Int
  watched: Boolean
  date_watched: DateTime!
  release_date: DateTime!
}

type TvEpisodeEdge {
  node: TvEpisode!
  cursor: String!
}

enum TvEpisodeOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  episode_ASC
  episode_DESC
  season_ASC
  season_DESC
  watched_ASC
  watched_DESC
  date_watched_ASC
  date_watched_DESC
  release_date_ASC
  release_date_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TvEpisodePreviousValues {
  id: ID!
  name: String
  episode: Int
  season: Int
  watched: Boolean
  date_watched: DateTime!
  release_date: DateTime!
}

type TvEpisodeSubscriptionPayload {
  mutation: MutationType!
  node: TvEpisode
  updatedFields: [String!]
  previousValues: TvEpisodePreviousValues
}

input TvEpisodeSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TvEpisodeWhereInput
  AND: [TvEpisodeSubscriptionWhereInput!]
  OR: [TvEpisodeSubscriptionWhereInput!]
  NOT: [TvEpisodeSubscriptionWhereInput!]
}

type TvEpisodeTransaction {
  id: ID!
  human: Human!
  show: TvShow!
  episode: TvEpisode!
  date_watched: DateTime!
}

type TvEpisodeTransactionConnection {
  pageInfo: PageInfo!
  edges: [TvEpisodeTransactionEdge]!
  aggregate: AggregateTvEpisodeTransaction!
}

input TvEpisodeTransactionCreateInput {
  human: HumanCreateOneWithoutTv_showsInput!
  show: TvShowCreateOneInput!
  episode: TvEpisodeCreateOneInput!
  date_watched: DateTime!
}

input TvEpisodeTransactionCreateManyWithoutHumanInput {
  create: [TvEpisodeTransactionCreateWithoutHumanInput!]
  connect: [TvEpisodeTransactionWhereUniqueInput!]
}

input TvEpisodeTransactionCreateWithoutHumanInput {
  show: TvShowCreateOneInput!
  episode: TvEpisodeCreateOneInput!
  date_watched: DateTime!
}

type TvEpisodeTransactionEdge {
  node: TvEpisodeTransaction!
  cursor: String!
}

enum TvEpisodeTransactionOrderByInput {
  id_ASC
  id_DESC
  date_watched_ASC
  date_watched_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TvEpisodeTransactionPreviousValues {
  id: ID!
  date_watched: DateTime!
}

type TvEpisodeTransactionSubscriptionPayload {
  mutation: MutationType!
  node: TvEpisodeTransaction
  updatedFields: [String!]
  previousValues: TvEpisodeTransactionPreviousValues
}

input TvEpisodeTransactionSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TvEpisodeTransactionWhereInput
  AND: [TvEpisodeTransactionSubscriptionWhereInput!]
  OR: [TvEpisodeTransactionSubscriptionWhereInput!]
  NOT: [TvEpisodeTransactionSubscriptionWhereInput!]
}

input TvEpisodeTransactionUpdateInput {
  human: HumanUpdateOneRequiredWithoutTv_showsInput
  show: TvShowUpdateOneRequiredInput
  episode: TvEpisodeUpdateOneRequiredInput
  date_watched: DateTime
}

input TvEpisodeTransactionUpdateManyWithoutHumanInput {
  create: [TvEpisodeTransactionCreateWithoutHumanInput!]
  delete: [TvEpisodeTransactionWhereUniqueInput!]
  connect: [TvEpisodeTransactionWhereUniqueInput!]
  disconnect: [TvEpisodeTransactionWhereUniqueInput!]
  update: [TvEpisodeTransactionUpdateWithWhereUniqueWithoutHumanInput!]
  upsert: [TvEpisodeTransactionUpsertWithWhereUniqueWithoutHumanInput!]
}

input TvEpisodeTransactionUpdateWithoutHumanDataInput {
  show: TvShowUpdateOneRequiredInput
  episode: TvEpisodeUpdateOneRequiredInput
  date_watched: DateTime
}

input TvEpisodeTransactionUpdateWithWhereUniqueWithoutHumanInput {
  where: TvEpisodeTransactionWhereUniqueInput!
  data: TvEpisodeTransactionUpdateWithoutHumanDataInput!
}

input TvEpisodeTransactionUpsertWithWhereUniqueWithoutHumanInput {
  where: TvEpisodeTransactionWhereUniqueInput!
  update: TvEpisodeTransactionUpdateWithoutHumanDataInput!
  create: TvEpisodeTransactionCreateWithoutHumanInput!
}

input TvEpisodeTransactionWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  human: HumanWhereInput
  show: TvShowWhereInput
  episode: TvEpisodeWhereInput
  date_watched: DateTime
  date_watched_not: DateTime
  date_watched_in: [DateTime!]
  date_watched_not_in: [DateTime!]
  date_watched_lt: DateTime
  date_watched_lte: DateTime
  date_watched_gt: DateTime
  date_watched_gte: DateTime
  AND: [TvEpisodeTransactionWhereInput!]
  OR: [TvEpisodeTransactionWhereInput!]
  NOT: [TvEpisodeTransactionWhereInput!]
}

input TvEpisodeTransactionWhereUniqueInput {
  id: ID
}

input TvEpisodeUpdateDataInput {
  name: String
  episode: Int
  season: Int
  watched: Boolean
  show: TvShowUpdateOneRequiredWithoutEpisodesInput
  date_watched: DateTime
  release_date: DateTime
}

input TvEpisodeUpdateInput {
  name: String
  episode: Int
  season: Int
  watched: Boolean
  show: TvShowUpdateOneRequiredWithoutEpisodesInput
  date_watched: DateTime
  release_date: DateTime
}

input TvEpisodeUpdateManyWithoutShowInput {
  create: [TvEpisodeCreateWithoutShowInput!]
  delete: [TvEpisodeWhereUniqueInput!]
  connect: [TvEpisodeWhereUniqueInput!]
  disconnect: [TvEpisodeWhereUniqueInput!]
  update: [TvEpisodeUpdateWithWhereUniqueWithoutShowInput!]
  upsert: [TvEpisodeUpsertWithWhereUniqueWithoutShowInput!]
}

input TvEpisodeUpdateOneRequiredInput {
  create: TvEpisodeCreateInput
  update: TvEpisodeUpdateDataInput
  upsert: TvEpisodeUpsertNestedInput
  connect: TvEpisodeWhereUniqueInput
}

input TvEpisodeUpdateWithoutShowDataInput {
  name: String
  episode: Int
  season: Int
  watched: Boolean
  date_watched: DateTime
  release_date: DateTime
}

input TvEpisodeUpdateWithWhereUniqueWithoutShowInput {
  where: TvEpisodeWhereUniqueInput!
  data: TvEpisodeUpdateWithoutShowDataInput!
}

input TvEpisodeUpsertNestedInput {
  update: TvEpisodeUpdateDataInput!
  create: TvEpisodeCreateInput!
}

input TvEpisodeUpsertWithWhereUniqueWithoutShowInput {
  where: TvEpisodeWhereUniqueInput!
  update: TvEpisodeUpdateWithoutShowDataInput!
  create: TvEpisodeCreateWithoutShowInput!
}

input TvEpisodeWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  episode: Int
  episode_not: Int
  episode_in: [Int!]
  episode_not_in: [Int!]
  episode_lt: Int
  episode_lte: Int
  episode_gt: Int
  episode_gte: Int
  season: Int
  season_not: Int
  season_in: [Int!]
  season_not_in: [Int!]
  season_lt: Int
  season_lte: Int
  season_gt: Int
  season_gte: Int
  watched: Boolean
  watched_not: Boolean
  show: TvShowWhereInput
  date_watched: DateTime
  date_watched_not: DateTime
  date_watched_in: [DateTime!]
  date_watched_not_in: [DateTime!]
  date_watched_lt: DateTime
  date_watched_lte: DateTime
  date_watched_gt: DateTime
  date_watched_gte: DateTime
  release_date: DateTime
  release_date_not: DateTime
  release_date_in: [DateTime!]
  release_date_not_in: [DateTime!]
  release_date_lt: DateTime
  release_date_lte: DateTime
  release_date_gt: DateTime
  release_date_gte: DateTime
  AND: [TvEpisodeWhereInput!]
  OR: [TvEpisodeWhereInput!]
  NOT: [TvEpisodeWhereInput!]
}

input TvEpisodeWhereUniqueInput {
  id: ID
}

type TvShow {
  id: ID!
  name: String!
  episodes(where: TvEpisodeWhereInput, orderBy: TvEpisodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TvEpisode!]
}

type TvShowConnection {
  pageInfo: PageInfo!
  edges: [TvShowEdge]!
  aggregate: AggregateTvShow!
}

input TvShowCreateInput {
  name: String!
  episodes: TvEpisodeCreateManyWithoutShowInput
}

input TvShowCreateOneInput {
  create: TvShowCreateInput
  connect: TvShowWhereUniqueInput
}

input TvShowCreateOneWithoutEpisodesInput {
  create: TvShowCreateWithoutEpisodesInput
  connect: TvShowWhereUniqueInput
}

input TvShowCreateWithoutEpisodesInput {
  name: String!
}

type TvShowEdge {
  node: TvShow!
  cursor: String!
}

enum TvShowOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TvShowPreviousValues {
  id: ID!
  name: String!
}

type TvShowSubscriptionPayload {
  mutation: MutationType!
  node: TvShow
  updatedFields: [String!]
  previousValues: TvShowPreviousValues
}

input TvShowSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TvShowWhereInput
  AND: [TvShowSubscriptionWhereInput!]
  OR: [TvShowSubscriptionWhereInput!]
  NOT: [TvShowSubscriptionWhereInput!]
}

input TvShowUpdateDataInput {
  name: String
  episodes: TvEpisodeUpdateManyWithoutShowInput
}

input TvShowUpdateInput {
  name: String
  episodes: TvEpisodeUpdateManyWithoutShowInput
}

input TvShowUpdateOneRequiredInput {
  create: TvShowCreateInput
  update: TvShowUpdateDataInput
  upsert: TvShowUpsertNestedInput
  connect: TvShowWhereUniqueInput
}

input TvShowUpdateOneRequiredWithoutEpisodesInput {
  create: TvShowCreateWithoutEpisodesInput
  update: TvShowUpdateWithoutEpisodesDataInput
  upsert: TvShowUpsertWithoutEpisodesInput
  connect: TvShowWhereUniqueInput
}

input TvShowUpdateWithoutEpisodesDataInput {
  name: String
}

input TvShowUpsertNestedInput {
  update: TvShowUpdateDataInput!
  create: TvShowCreateInput!
}

input TvShowUpsertWithoutEpisodesInput {
  update: TvShowUpdateWithoutEpisodesDataInput!
  create: TvShowCreateWithoutEpisodesInput!
}

input TvShowWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  episodes_every: TvEpisodeWhereInput
  episodes_some: TvEpisodeWhereInput
  episodes_none: TvEpisodeWhereInput
  AND: [TvShowWhereInput!]
  OR: [TvShowWhereInput!]
  NOT: [TvShowWhereInput!]
}

input TvShowWhereUniqueInput {
  id: ID
}

type WeightHistoryItem {
  id: ID!
  weight: Float
  date: DateTime!
  human: Human!
}

type WeightHistoryItemConnection {
  pageInfo: PageInfo!
  edges: [WeightHistoryItemEdge]!
  aggregate: AggregateWeightHistoryItem!
}

input WeightHistoryItemCreateInput {
  weight: Float
  date: DateTime!
  human: HumanCreateOneWithoutWeight_historyInput!
}

input WeightHistoryItemCreateManyWithoutHumanInput {
  create: [WeightHistoryItemCreateWithoutHumanInput!]
  connect: [WeightHistoryItemWhereUniqueInput!]
}

input WeightHistoryItemCreateWithoutHumanInput {
  weight: Float
  date: DateTime!
}

type WeightHistoryItemEdge {
  node: WeightHistoryItem!
  cursor: String!
}

enum WeightHistoryItemOrderByInput {
  id_ASC
  id_DESC
  weight_ASC
  weight_DESC
  date_ASC
  date_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type WeightHistoryItemPreviousValues {
  id: ID!
  weight: Float
  date: DateTime!
}

type WeightHistoryItemSubscriptionPayload {
  mutation: MutationType!
  node: WeightHistoryItem
  updatedFields: [String!]
  previousValues: WeightHistoryItemPreviousValues
}

input WeightHistoryItemSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: WeightHistoryItemWhereInput
  AND: [WeightHistoryItemSubscriptionWhereInput!]
  OR: [WeightHistoryItemSubscriptionWhereInput!]
  NOT: [WeightHistoryItemSubscriptionWhereInput!]
}

input WeightHistoryItemUpdateInput {
  weight: Float
  date: DateTime
  human: HumanUpdateOneRequiredWithoutWeight_historyInput
}

input WeightHistoryItemUpdateManyWithoutHumanInput {
  create: [WeightHistoryItemCreateWithoutHumanInput!]
  delete: [WeightHistoryItemWhereUniqueInput!]
  connect: [WeightHistoryItemWhereUniqueInput!]
  disconnect: [WeightHistoryItemWhereUniqueInput!]
  update: [WeightHistoryItemUpdateWithWhereUniqueWithoutHumanInput!]
  upsert: [WeightHistoryItemUpsertWithWhereUniqueWithoutHumanInput!]
}

input WeightHistoryItemUpdateWithoutHumanDataInput {
  weight: Float
  date: DateTime
}

input WeightHistoryItemUpdateWithWhereUniqueWithoutHumanInput {
  where: WeightHistoryItemWhereUniqueInput!
  data: WeightHistoryItemUpdateWithoutHumanDataInput!
}

input WeightHistoryItemUpsertWithWhereUniqueWithoutHumanInput {
  where: WeightHistoryItemWhereUniqueInput!
  update: WeightHistoryItemUpdateWithoutHumanDataInput!
  create: WeightHistoryItemCreateWithoutHumanInput!
}

input WeightHistoryItemWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  weight: Float
  weight_not: Float
  weight_in: [Float!]
  weight_not_in: [Float!]
  weight_lt: Float
  weight_lte: Float
  weight_gt: Float
  weight_gte: Float
  date: DateTime
  date_not: DateTime
  date_in: [DateTime!]
  date_not_in: [DateTime!]
  date_lt: DateTime
  date_lte: DateTime
  date_gt: DateTime
  date_gte: DateTime
  human: HumanWhereInput
  AND: [WeightHistoryItemWhereInput!]
  OR: [WeightHistoryItemWhereInput!]
  NOT: [WeightHistoryItemWhereInput!]
}

input WeightHistoryItemWhereUniqueInput {
  id: ID
}

type WishList {
  balance: Float!
  items(where: GoodOrServiceWhereInput, orderBy: GoodOrServiceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [GoodOrService!]
}

type WishListConnection {
  pageInfo: PageInfo!
  edges: [WishListEdge]!
  aggregate: AggregateWishList!
}

input WishListCreateInput {
  balance: Float
  items: GoodOrServiceCreateManyInput
}

type WishListEdge {
  node: WishList!
  cursor: String!
}

enum WishListOrderByInput {
  balance_ASC
  balance_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type WishListPreviousValues {
  balance: Float!
}

type WishListSubscriptionPayload {
  mutation: MutationType!
  node: WishList
  updatedFields: [String!]
  previousValues: WishListPreviousValues
}

input WishListSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: WishListWhereInput
  AND: [WishListSubscriptionWhereInput!]
  OR: [WishListSubscriptionWhereInput!]
  NOT: [WishListSubscriptionWhereInput!]
}

input WishListUpdateInput {
  balance: Float
  items: GoodOrServiceUpdateManyInput
}

input WishListWhereInput {
  balance: Float
  balance_not: Float
  balance_in: [Float!]
  balance_not_in: [Float!]
  balance_lt: Float
  balance_lte: Float
  balance_gt: Float
  balance_gte: Float
  items_every: GoodOrServiceWhereInput
  items_some: GoodOrServiceWhereInput
  items_none: GoodOrServiceWhereInput
  AND: [WishListWhereInput!]
  OR: [WishListWhereInput!]
  NOT: [WishListWhereInput!]
}
`;
