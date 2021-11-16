export type NewsItemTypes = {
  author: null | string
  title: string
  description: string
  url: string
  source: string
  image: string
  category: string
  language: string
  country: string
  published_at: string
}


export interface NewsStateTypes {
  news: Array<NewsItemTypes> | []
}

export enum NewsActionsTypes {
  SET_NEWS = 'SET_NEWS',
  CLEAR_NEWS = 'CLEAR_NEWS'
}

interface SetNews {
  type: NewsActionsTypes.SET_NEWS
  payload: Array<NewsItemTypes>
}

interface ClearNews {
  type: NewsActionsTypes.CLEAR_NEWS
  payload: any
}

export type NewsActions = SetNews | ClearNews;