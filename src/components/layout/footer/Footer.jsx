import { FooterStyled } from './Footer.styled';

export function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <FooterStyled>
      <span>&copy; {year}, </span>
      <span>Creado con ❤️ Por </span>
      <a
        href='https://github.com/cristian2213'
        target='_blank'
        rel='noreferrer'
      >
        Cristian Johany Devia Hormaza
      </a>
    </FooterStyled>
  );
}
