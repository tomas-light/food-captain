import { CommonIconProps } from './CommonProps';

type Props = Omit<CommonIconProps, 'height' | 'width'>;

const primaryFireColor = '#B00020';
const secondaryFireColor = '#F7CB01';
const woodColor = '#560702';

const FireIcon = (props: Props) => {
  const { color, ...rest } = props;
  return (
    <svg
      {...rest}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.7558 11.362C14.2245 11.1079 14.6675 10.8679 15.0828 10.6045C17.0731 9.34259 17.9999 7.83884 17.9999 5.87009C17.9999 2.83915 15.3716 0.976336 12.8989 0.760711C12.5947 0.733992 12.1958 0.741023 11.9656 0.942586C11.7355 1.14415 11.69 1.53134 11.6774 1.8379C11.6127 3.41337 10.347 4.60352 9.00548 5.86259C7.69298 7.0954 6.33689 8.36993 6.06595 10.1282C5.67173 12.6913 7.08501 14.1927 7.96251 14.8593C8.22259 15.0572 8.54038 15.1644 8.8672 15.1645C8.98416 15.1643 9.10072 15.1506 9.21454 15.1237C9.42921 15.0734 9.63001 14.976 9.80244 14.8386C9.97487 14.7012 10.1146 14.5272 10.2116 14.3291C10.9105 12.9046 12.357 12.1204 13.7558 11.362Z"
        fill={color ?? primaryFireColor}
      />
      <path
        d="M6.55406 7.33912C7.12688 6.60037 7.81969 5.94787 8.49328 5.31646C9.42703 4.43896 10.2656 3.64865 10.673 2.79178C10.0992 2.44631 9.39047 2.25928 8.49281 2.25928C7.65891 2.25928 7.53703 2.50209 7.53703 3.15271C7.53703 3.74146 7.23094 4.11553 6.86484 4.58943C6.45937 5.11397 6 5.70787 6 6.60178C6 7.08131 6.06047 7.48162 6.19687 7.83787C6.30625 7.67162 6.42531 7.50537 6.55406 7.33912ZM15.4847 11.2377C15.0473 11.5152 14.5941 11.7608 14.1136 12.021C12.7584 12.756 11.4788 13.4497 10.8848 14.6591C10.8573 14.7165 10.8279 14.7729 10.7967 14.8283C10.7708 14.8745 10.7549 14.9256 10.7502 14.9783C10.7454 15.0309 10.7519 15.0841 10.7691 15.1341C10.7863 15.1841 10.8139 15.2299 10.8501 15.2685C10.8863 15.3071 10.9302 15.3376 10.9791 15.358C11.5561 15.5971 12.157 15.7457 12.803 15.7457C14.1709 15.7547 15.4877 15.2267 16.4705 14.2752C16.9576 13.8026 17.3443 13.2364 17.6071 12.6105C17.87 11.9847 18.0036 11.3123 18 10.6335C17.9997 10.3978 17.9788 10.1625 17.9377 9.93037C17.9255 9.86127 17.8943 9.79695 17.8475 9.74472C17.8006 9.69249 17.7401 9.65445 17.6727 9.63492C17.6053 9.61539 17.5338 9.61515 17.4663 9.63423C17.3988 9.65332 17.338 9.69096 17.2908 9.74287C16.8136 10.2805 16.2159 10.7741 15.4847 11.2377Z"
        fill={color ?? secondaryFireColor}
      />
      <path
        d="M11.9452 16.4966C12.3994 16.4966 12.7767 16.8346 12.8147 17.2672L13.635 21.2239C13.6746 21.3683 13.695 21.5172 13.6955 21.6669C13.6955 22.6011 12.9131 23.2499 11.9452 23.2499C10.9772 23.2499 10.1953 22.6011 10.1953 21.6669C10.1961 21.5427 10.2107 21.419 10.2389 21.298L11.092 17.1561C11.1399 16.9665 11.25 16.7985 11.4046 16.6789C11.5593 16.5594 11.7497 16.4951 11.9452 16.4966Z"
        fill={color ?? woodColor}
      />
      <path
        d="M18.9891 18.9153C19.0878 18.9753 19.1811 19.0437 19.268 19.1197C19.7812 19.5228 19.7873 20.4336 19.2745 20.9474C18.7547 21.4499 17.8088 21.4236 17.3822 20.9474C17.3138 20.8793 17.2511 20.8058 17.1947 20.7275L14.7338 17.4931C14.6527 17.3691 14.6177 17.2205 14.6348 17.0733C14.6519 16.9261 14.7201 16.7895 14.8275 16.6874C15.0736 16.4469 15.4125 16.4417 15.7298 16.6405L18.9891 18.9153Z"
        fill={color ?? woodColor}
      />
      <path
        d="M18.4163 15.7466H21.7172C22.1437 15.7466 22.5 16.0817 22.5 16.7206C22.5 17.2236 21.8906 17.6249 21.4383 17.5213L18.3244 16.558C18.1383 16.4966 18 16.3536 18 16.1286C18 15.9036 18.203 15.7466 18.4163 15.7466Z"
        fill={color ?? woodColor}
      />
      <path
        d="M5.56734 15.7466C5.79703 15.7466 6.01031 15.8966 6.01031 16.1286C6.01031 16.3592 5.91188 16.4966 5.70609 16.558L2.54531 17.5213C2.09156 17.6249 1.5 17.2016 1.5 16.6986C1.5 16.1956 1.85062 15.7466 2.26641 15.7466H5.56734Z"
        fill={color ?? woodColor}
      />
      <path
        d="M5.01562 18.9097L8.27578 16.6428C8.40783 16.5418 8.5714 16.4909 8.73745 16.499C8.9035 16.5072 9.06129 16.5739 9.18281 16.6874C9.41344 16.8992 9.44062 17.2231 9.27656 17.4842L6.81375 20.7013C6.75875 20.7805 6.69593 20.854 6.62625 20.9206C6.37041 21.162 6.03201 21.2964 5.68031 21.2964C5.32862 21.2964 4.99022 21.162 4.73438 20.9206C4.61018 20.8051 4.51113 20.6653 4.4434 20.5098C4.37567 20.3543 4.34071 20.1865 4.34071 20.0169C4.34071 19.8473 4.37567 19.6795 4.4434 19.524C4.51113 19.3685 4.61018 19.2287 4.73438 19.1131C4.82001 19.0348 4.91438 18.9665 5.01562 18.9097Z"
        fill={color ?? woodColor}
      />
      <path
        d="M11.9452 16.4966C12.3994 16.4966 12.7767 16.8346 12.8147 17.2672L13.635 21.2239C13.6746 21.3683 13.695 21.5172 13.6955 21.6669C13.6955 22.6011 12.9131 23.2499 11.9452 23.2499C10.9772 23.2499 10.1953 22.6011 10.1953 21.6669C10.1961 21.5427 10.2107 21.419 10.2389 21.298L11.092 17.1561C11.1399 16.9665 11.25 16.7985 11.4046 16.6789C11.5593 16.5594 11.7497 16.4951 11.9452 16.4966Z"
        stroke={color ?? woodColor}
      />
      <path
        d="M18.9891 18.9153C19.0878 18.9753 19.1811 19.0437 19.268 19.1197C19.7812 19.5228 19.7873 20.4336 19.2745 20.9474C18.7547 21.4499 17.8088 21.4236 17.3822 20.9474C17.3138 20.8793 17.2511 20.8058 17.1947 20.7275L14.7338 17.4931C14.6527 17.3691 14.6177 17.2205 14.6348 17.0733C14.6519 16.9261 14.7201 16.7895 14.8275 16.6874C15.0736 16.4469 15.4125 16.4417 15.7298 16.6405L18.9891 18.9153Z"
        stroke={color ?? woodColor}
      />
      <path
        d="M18.4163 15.7466H21.7172C22.1437 15.7466 22.5 16.0817 22.5 16.7206C22.5 17.2236 21.8906 17.6249 21.4383 17.5213L18.3244 16.558C18.1383 16.4966 18 16.3536 18 16.1286C18 15.9036 18.203 15.7466 18.4163 15.7466Z"
        stroke={color ?? woodColor}
      />
      <path
        d="M5.56734 15.7466C5.79703 15.7466 6.01031 15.8966 6.01031 16.1286C6.01031 16.3592 5.91188 16.4966 5.70609 16.558L2.54531 17.5213C2.09156 17.6249 1.5 17.2016 1.5 16.6986C1.5 16.1956 1.85062 15.7466 2.26641 15.7466H5.56734Z"
        stroke={color ?? woodColor}
      />
      <path
        d="M5.01562 18.9097L8.27578 16.6428C8.40783 16.5418 8.5714 16.4909 8.73745 16.499C8.9035 16.5072 9.06129 16.5739 9.18281 16.6874C9.41344 16.8992 9.44062 17.2231 9.27656 17.4842L6.81375 20.7013C6.75875 20.7805 6.69593 20.854 6.62625 20.9206C6.37041 21.162 6.03201 21.2964 5.68031 21.2964C5.32862 21.2964 4.99022 21.162 4.73438 20.9206C4.61018 20.8051 4.51113 20.6653 4.4434 20.5098C4.37567 20.3543 4.34071 20.1865 4.34071 20.0169C4.34071 19.8473 4.37567 19.6795 4.4434 19.524C4.51113 19.3685 4.61018 19.2287 4.73438 19.1131C4.82001 19.0348 4.91438 18.9665 5.01562 18.9097Z"
        stroke={color ?? woodColor}
      />
    </svg>
  );
};

export type { Props as FireIconProps };
export { FireIcon };