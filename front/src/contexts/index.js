import { createContext } from "react";
import api from "../services/api";

export const CurriculumContext = createContext();

const CurriculumProvider = ({ children }) => {
  const createCurriculum = (data) => {
    return api
      .post("/create", data)
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  };

  const listCurriculum = () => {
    return api
      .get("/list")
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return [];
      });
  };

  const deleteCurriculum = (id) => {
    return api.delete(`/delete/${id}`);
  };

  return (
    <CurriculumContext.Provider
      value={{ createCurriculum, listCurriculum, deleteCurriculum }}
    >
      {children}
    </CurriculumContext.Provider>
  );
};

export default CurriculumProvider;
