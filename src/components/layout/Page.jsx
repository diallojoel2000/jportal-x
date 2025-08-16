import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { pageTitleActions } from "../../store/pageTitle-slice";

const Page = ({ title, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = title;
    dispatch(pageTitleActions.changeTitle(title));
  }, [title]);
  return <>{children}</>;
};

export default Page;
