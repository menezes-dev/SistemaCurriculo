import styled from "styled-components";

export const Container = styled.div`
  .busca {
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 40px;
  }

  .busca input {
    background-color: transparent;
    border: none;
    border-bottom: 2px solid var(--text-color);
    color: var(--text-color);
    outline: none;
    padding: 8px 0;
    width: 70%;
    font-size: 16px;
    margin-bottom: 15px;
  }

  .busca input::placeholder {
    color: var(--text-color);
    opacity: 0.7;
  }

  input:focus {
    border-bottom: 2px solid var(--accent-color);
  }

  .paginacao {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    margin-left: 20px;
  }

  button:focus {
    background-color: var(--border-color);
    color: var(--text-color);
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 5px;
  }

  .delete {
    background-color: var(--danger-color);
    color: white; // Para garantir que o texto tenha bom contraste
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }

  .delete:hover {
    background-color: var(--border-color);
    color: var(--text-color);
  }
`;
