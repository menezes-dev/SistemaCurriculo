import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;

  input,
  textarea {
    background-color: transparent;
    border: none;
    border-bottom: 2px solid var(--text-color);
    color: var(--text-color);
    outline: none;
    padding: 8px 0;
    width: 100%;
    font-size: 16px;
    margin-bottom: 15px;
  }

  input::placeholder,
  textarea::placeholder {
    color: var(--text-color);
    opacity: 0.7;
  }

  input:focus,
  textarea:focus {
    border-bottom: 2px solid var(--accent-color);
  }

  .submit,
  .title {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`;
