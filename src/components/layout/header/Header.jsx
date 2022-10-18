import { HeaderStyled } from './Header.styled';
import { IoLogoLinkedin, IoLogoGithub } from 'react-icons/io5';

export function Header() {
  return (
    <HeaderStyled>
      <a
        href='https://www.linkedin.com/in/cristian-johany/'
        target='_blank'
        rel='noreferrer'
        className='c-d-flex'
      >
        <IoLogoLinkedin size={28} />
        <span>Cristian Johany Devia | LinkedIn</span>
      </a>
      <a
        href='https://github.com/cristian2213'
        target='_blank'
        rel='noreferrer'
        className='c-d-flex'
      >
        <IoLogoGithub size={28} />
        <span>cristian2213 | GitHub</span>
      </a>
    </HeaderStyled>
  );
}
