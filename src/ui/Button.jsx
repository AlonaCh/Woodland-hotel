import styled from "styled-components";

export const Button = styled.button`
font-size: 1.4rem;
font-weight: 500;
padding: 1.2rem 1.6rem;
border: none;
border-radius: var(--border-radius-sm);
background-color: var(--color-brand-500);
color: var(--color-brand-50);
box-shadow: var(--shadow-sm);
margin: 20px;
cursor: pointer;
&:hover {
background-color: var(--color-brand-700);
}
`;

export default Button;