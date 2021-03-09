// signup
export type SignUpVariables = {
  firstname: string
  lastname: string
  password: string
  email: string
  code?: string
  profilePic?: any
}

export type SignUpResult = {
  success: true
}

// signin
export type SignInVariables = {
  email: string
  password: string
}

export type User = {
  _id: string
  email: string
  firstname: string
  lastname: string
  username: string
  tutor?: any
  status?: string
  extraTab: boolean
  favorites: any
  quickStart: any
  code?: boolean
  jobtitle: string
  profilePic?: string
  team?: UserTeam[]
  settings: any
}

export type SignInResult = {
  success: true
  token: string
  user: User
}

export type CheckVerificationCodeVariables = {
  email: string
  code: number | string
}

export type Team = {
  _id: string
  name: string
  teamMembers: string[]
  teamLeaders: string[]
  viewingRights: string[]
  admins: string[]
  company?: Company
  profilePic: string
  description: string
  frequency?: number
  tlFrequency?: number
  selfFrequency?: number
  feedbackTarget: number
}

export type CreateTeamVariables = {
  name: string
  description?: string
  profilePic?: any
  demo?: boolean
  autoAddDisabled?: boolean
}

export type CreateTeamResult = {
  success: true
  team: Team
}

export type GetTeamsResult = {
  success: true
  data: Team[]
}

export type GetInvitesResult = {
  success: true
  data: Invite[]
}

export type InviteUserVariables = {
  type: 'Team member' | 'Viewing rights' | 'Admin rights' | 'Team leader'
  teamId: string
  invitedUser: string
}

export type GetActiveTeamUsersVariables = {
  type: 'Team member' | 'Viewing rights' | 'Admin rights'
  teamId: string
}

export type UpdateTeamProfileVariable = {
  name?: string
  description?: string
  teamId: string
  image?: any
  profilePic?: string
  frequency?: number
  tlFrequency?: number
  selfFrequency?: number
  feedbackTarget?: number
}

export type Invite = {
  _id: string
  invitedUser: string
  sender: User
  senderId: User
  company: string
  senderName: string
  teamName: string
  type: string
}
export type SelectedTeamData = {
  _id: string
  teamMembers: User[] &
    {
      request?: number
    }[]
  teamLeaders: User[]
  admins: User[]
  viewingRights: User[]
  ['Team member']: Invite[]
  ['Team leader']: Invite[]
  ['Admin rights']: Invite[]
  ['Viewing rights']: Invite[]
}

export type MyTeamsStatus = {
  _id: string
  name: string
  description: string
  roles: string[]
}

export type MyTeamsStatusResult = {
  succues: true
  data: MyTeamsStatus[]
}

export type InviteUserResult = {
  succes: true
  data: Invite
}

export type TeamByKeyword = {
  name: string
  leader: string
  _id: string
}

export type TeamsByKeywordResult = {
  success: true
  teams: TeamByKeyword[]
}

export type PendingRequest = {
  _id: string
  requester: {
    _id: string
    firstname: string
    lastname: string
  }
  type: string
  team: {
    _id: string
    name: string
  }
}

export type UpdateProfileVariables = {
  firstname?: string
  lastname?: string
  profilePic?: string
  jobtitle?: string
  _id?: string
  image?: any
}

export type Question = {
  _id: string
  questionId: string
  question: string
  type: string
  unread?: number
}

export type UserTeam = {
  _id: string
  name: string
  category: string
  description?: string
}

export type SendFeedbackVariables = {
  receiver: string
  teamId: string
  valueData: ValueAnswer[]
  textData: TextAnswer[]
  category: string
}

export type ValueAnswer = {
  questionId: string
  question: string
  value: number
  _id?: string
}

export type TextAnswer = {
  questionId: string
  question: string
  value: string
  _id?: string
}

export type UserInData = {
  _id: string
  firstname: string
  lastname: string
  category: string
}

export type Comment = {
  _id: string
  sender: UserInData
  receiver: UserInData
  textData: TextAnswer[]
  comments?: {
    comment: string
    sender: User
  }[]
  totalLikes: number
  like: boolean
}

export type MyCurrent = {
  _id: string
  questionId: string
  question: string
  average: number
  change?: number
  previous: number
}

export type Week = {
  average: number
  caption: string
  year: string
}
export type Month = {
  average: number
  caption: string
  year: string
}

export type MyData = {
  week: Week[]
  month: Month[]
}

export type ToDo = {
  _id: string
  userId: string
  type: string
  target: User
  team: UserTeam
}

export type TeamUserRank = {
  _id: string
  average: number
  change: number
  user: User
  isLeader: boolean
}

export type SentFeedbackData = {
  questionId: string
  value: number
  question: string
}

export type SelectedBarData = {
  _id: string
  average: number
  question: string
}

export type SendCommentVariables = {
  feedbackId: string
  sender: string
  comment: string
  firstname: string
  lastname: string
}

export type CommentOnFeedback = {
  _id: string
  feedbackId: string
  sender: User
  receiver: User
  comment: string
}

export type QuestionByCategory = {
  _id: string
  type: string
  question: string
  level: string
  questionOutput: string
}

export type GetQuestionsByCategoryVariables = {
  teamId: string
  category: string
}

export type AddQuestionVariables = {
  teamId: string
  category: string
  question: string
  type: 'value' | 'text'
}

export type AddQuestionResult = {
  _id: string
  teamId: string
  type: string
  category: string
  level: string
  question: string
}
export type CompanyTeam = {
  _id: string
  name: string
  teamLeaders: User[]
  teamMembers: String[]
  status: string
  description: string
}

export type Company = {
  _id: string
  name: string
  teams: CompanyTeam[]
  profilePic: string
}

export type CreateCompanyVariables = {
  name: string
  profilePic?: any
}

export type InviteEmployeesVariables = {
  emails: string[]
  type: string
}

export type CompanyInvite = {
  _id: string
  sender: User
  company: {
    _id: string
    name: string
    profilePic: string
  }
  type: string
}

export type CompanyFeedback = {
  caption: string
  p2p: number
  team: number
  subordinate: number
  supervisor: number
  self: number
  total: number
}

export type CompanyFeedbackData = {
  weekly: CompanyFeedback[]
  monthly: CompanyFeedback[]
  last30Days: CompanyFeedback
}

export type RelationalDataText = {
  _id: String
  category: String
  receiver: String
  sender: User
  output: {
    last30: String[]
    last90: String[]
  }
  question: string
}

export type RelationalDataValue = {
  _id: String
  category: String
  receiver: String
  sender: User
  output: {
    last30: Number
    last90: Number
  }
  question: string
}

export type SmallQuestionText = {
  question: string
  value: string[]
}
export type SmallQuestionValue = {
  question: string
  value: number
}
export type RelationData = {
  sender: User
  receiver: User
  count: number
  value: {
    last30: SmallQuestionValue[]
    last90: SmallQuestionValue[]
  }

  text: {
    last30: SmallQuestionText[]
    last90: SmallQuestionText[]
  }
}

export type RelationDataContainer = {
  p2p?: RelationData[]
  supervisor?: RelationData[]
  subordinate?: RelationData[]
  self?: RelationData[]
  team?: RelationData[]
}

export type RelationalDataVariables = {
  category: 'p2p' | 'subordinate' | 'supervisor' | 'self'
  receiver: string
  teamId: string
  type?: 'sender' | 'receiver'
}

export type CompanyPendingInvite = {
  _id: string
  invitedUser: string
}

export type AddFeedbackRequestVariables = {
  target: string
  type: string
  userId: string
  frequency: number
  level: 'company' | 'team'
  teamId: string
}

export type FeedbackRequest = {
  _id: string
  targets: {
    target: User
    frequency: number
    _id: string
  }[]
}

export type GetFeedbackRequestVariables = {
  userId: string
  teamId: string
}

export type ChangeFrequencyVariables = {
  requestId: string
  userId: string
  teamId: string
  frequency: number
}

export type GetFeedbacksByQuestionIdVariables = {
  questionId: string
  teamId: string
}

export type TexyAnswerByQuestionId = {
  value: string
  _id: string
  sender: User
  like?: boolean
  read: boolean
}

export type AddWidgetVariables = {
  widgetId: string
  teamId: string
}

export type LineData = {
  questionId: string
  data: number[]
  labels: {
    caption: number
    year: number
  }[]
}

export type BarData = {
  sender: User
  question?: string
  average: number
  change: number
}

export type MixData = {
  averageP2p: number
  averageSelf: number
  question: string
  _id: string
}

export type ComboChartData = {
  data: {
    question: number
    average: 0
  }[]
  user: User
}

export type MyWidget = {
  _id: string
  average?: number
  change?: number
  widgetIdentifier: string
  question: string
  data?: LineData[] | BarData[] | MixData[] | ComboChartData[]
  dataWeek?: LineData[] | BarData[]
  chartTitle: string
  user: User
  settings?: any
  widgetId?: string
  sent?: number
  received?: number
}
export type MyWidgetData = {
  
    self: {
      data: MyWidget[] | null
      layout?: any
    }
    p2p: {
      data: MyWidget[] | null
      layout?: any
    }
    team: {
      data: MyWidget[] | null
      layout?: any
    }
    supervisor: {
      data: MyWidget[] | null
      layout?: any
    }
    supervisoryFeedback: {
      data: MyWidget[] | null
      layout?: any
    }
    userSentFeedback: {
      data: MyWidget[] | null
      layout?: any
    }

}

export type UserRecievedTextFeedback = {
  _id: string
  sender: User
  textData: {
    _id: string
    value: string
    question: string
  }[]
  valueData: {
    _id: string
    value: number
    question: string
  }[]

  like?: boolean
  read: boolean
}

export type TargetHistory = {
  _id: string
  sender: User
  type: string
  comment?: string
}

export type Category = 'self' | 'team' | 'p2p' | 'userSentFeedback' | 'supervisor' | 'supervisoryFeedback'



export type DirectFeedback = {
  _id: string
  sender: User
  receiver: User
  textData: TextAnswer[]
  valueData: ValueAnswer[]
}