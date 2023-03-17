import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { bodyActions } from "../store/bodySlice";
import { discsActions } from "../store/discsSlice";
import { glassActions } from "../store/glassSlice";

export const useActions = () => {
  const actions = {
    ...glassActions,
    ...discsActions,
    ...bodyActions,
  };

  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
