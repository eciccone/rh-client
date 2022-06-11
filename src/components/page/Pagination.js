import { Button } from "../btn/Button";
import { ButtonBar } from "../btn/ButtonBar";

export const Pagination = ({ 
  pageLimit, 
  pageOffset, 
  total, 
  changePageCallback 
}) => {

  const handleNextPage = () => {
    changePageCallback(pageOffset + pageLimit);
  }

  const handlePrevPage = () => {
    changePageCallback(pageOffset - pageLimit);
  }

  return (
    <ButtonBar>
      { pageOffset > 0 && <Button onClick={handlePrevPage}>Back</Button>}
      { pageOffset + pageLimit < total && <Button onClick={handleNextPage}>Next</Button> }
    </ButtonBar>
  );
}