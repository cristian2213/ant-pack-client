import { Image } from 'antd';
import { LogoWrap } from './Logo.styled';

export function Logo() {
  return (
    <LogoWrap>
      <Image
        src="https://static.wixstatic.com/media/98f07d_c433417234e34410a610f561b2f7a511~mv2.png/v1/fill/w_386,h_385,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/AntPack_Logo_White_Transparent.png"
        // width={100}
        // height={100}
        preview={false}
      />
    </LogoWrap>
  );
}
