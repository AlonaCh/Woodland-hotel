import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const Filter = ({filteredField, options}) => {
  //options is array of values
  const [searchParams, setSearchParams] = useSearchParams();
  //to see if it is active, we need to get value from URL
  const currentFilterValue = searchParams.get(filteredField) || options[0]?.value

  //updates a URL search parameter when called
    function handleClick(value) {
    searchParams.set(filteredField, value); //new search param
setSearchParams(searchParams);

}

  return (
    <StyledFilter>
     {
     options.map((option) => (
        <FilterButton 
        key={option.value}
          onClick={() => handleClick(option.value)}
        $active={option.value === currentFilterValue ? 'true' : undefined}
        disabled={option.value === currentFilterValue}>
          {option.label}
          </FilterButton>
      ))}

      {/* <FilterButton onClick={() => handleClick('all')}>All</FilterButton>
      <FilterButton onClick={() => handleClick('noDiscount')}>No discount</FilterButton>
      <FilterButton onClick={() => handleClick('withDiscount')}>With discount</FilterButton> */}
    </StyledFilter>
  )
}

export default Filter