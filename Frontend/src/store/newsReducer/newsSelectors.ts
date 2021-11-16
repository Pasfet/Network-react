import { NewsItemTypes } from "../../types/newsPageTypes";
import { RootReducerTypes } from "../index";

export const getNewsFromStore = (state : RootReducerTypes) : Array<NewsItemTypes> => state.newsPage?.news;
