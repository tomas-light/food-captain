import { CommonIconProps } from './CommonProps';

type Props = Omit<CommonIconProps, 'height' | 'width' | 'color'>;

const MeatBallIcon = (props: Props) => {
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="9" fill="#FAA31C" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.0916 4.15C13.1736 4.15 13.2504 4.12809 13.3166 4.08979C13.3828 4.12808 13.4596 4.15 13.5416 4.15C13.5416 4.39853 13.7431 4.6 13.9916 4.6C14.0736 4.6 14.1504 4.57809 14.2166 4.53979C14.2828 4.57808 14.3596 4.6 14.4416 4.6C14.4416 4.84853 14.6431 5.05 14.8916 5.05C15.1401 5.05 15.3416 4.84853 15.3416 4.6C15.3416 4.35148 15.1401 4.15001 14.8916 4.15C14.8916 3.90147 14.6901 3.7 14.4416 3.7C14.3596 3.7 14.2828 3.72192 14.2166 3.76021C14.1504 3.72192 14.0736 3.7 13.9916 3.7C13.9916 3.45147 13.7901 3.25 13.5416 3.25C13.4597 3.25 13.3828 3.27192 13.3166 3.31021C13.2504 3.27192 13.1736 3.25 13.0916 3.25C13.0096 3.25 12.9327 3.27193 12.8665 3.31025C12.8327 3.29072 12.7964 3.27562 12.7584 3.26542C12.6945 3.24825 12.6276 3.24538 12.5624 3.25702C12.4973 3.26866 12.4355 3.29453 12.3815 3.33278C12.3275 3.37103 12.2826 3.42072 12.25 3.47832L12.6416 3.7L12.6416 3.7M13.0916 4.15C12.8431 4.15 12.6416 3.94853 12.6416 3.7L13.0916 4.15Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.3916 5.95C10.4736 5.95 10.5504 5.92808 10.6166 5.88979C10.6828 5.92808 10.7597 5.95 10.8416 5.95H10.8416L11.2916 5.5C11.2916 5.25147 11.0902 5.05 10.8416 5.05C10.7597 5.05 10.6828 5.07191 10.6166 5.1102C10.5504 5.07191 10.4736 5.05 10.3916 5.05C10.3096 5.05 10.2328 5.07193 10.1666 5.11025C10.1327 5.09072 10.0964 5.07562 10.0584 5.06542C9.99452 5.04825 9.92761 5.04538 9.86246 5.05702C9.79731 5.06866 9.73554 5.09453 9.68153 5.13278C9.62752 5.17103 9.58262 5.22072 9.55002 5.27832L9.94163 5.5L9.94163 5.5M10.3916 5.95C10.1431 5.95 9.94163 5.74853 9.94163 5.5L10.3916 5.95Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.0041 6.26783C14.0846 6.28321 14.1642 6.27612 14.2364 6.25093C14.2942 6.30096 14.3656 6.33691 14.4461 6.35229L14.4461 6.35229L14.9726 5.99475C15.0192 5.75064 14.8591 5.51493 14.615 5.46829C14.5345 5.4529 14.4549 5.46 14.3827 5.48518C14.3249 5.43516 14.2535 5.39921 14.173 5.38383C14.0925 5.36844 14.0129 5.37555 13.9406 5.40076C13.9111 5.37523 13.8782 5.35358 13.8429 5.33644C13.7833 5.30757 13.7181 5.29219 13.6519 5.2914C13.5858 5.29061 13.5202 5.30442 13.46 5.33186C13.3998 5.35929 13.3464 5.39967 13.3035 5.45012L13.6466 5.74137L13.6466 5.74139C13.5999 5.98549 13.76 6.22119 14.0041 6.26783Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.9816 7.89986C17.9293 7.85926 17.8687 7.83069 17.8042 7.81619L17.7055 8.25525L17.7055 8.25526C17.4677 8.32732 17.3333 8.57855 17.4053 8.8164C17.4291 8.89484 17.4724 8.96203 17.5282 9.01427C17.5107 9.08872 17.512 9.16862 17.5358 9.24707L17.5358 9.24707C17.298 9.31913 17.1635 9.57036 17.2356 9.80821C17.2594 9.88666 17.3026 9.95386 17.3585 10.0061C17.341 10.0806 17.3423 10.1604 17.3661 10.2389C17.1282 10.3109 16.9938 10.5622 17.0659 10.8C17.138 11.0379 17.3892 11.1723 17.627 11.1002C17.8649 11.0282 17.9993 10.7769 17.9272 10.5391C18.1651 10.467 18.2995 10.2158 18.2274 9.97794C18.2037 9.89949 18.1604 9.83229 18.1046 9.78004C18.122 9.7056 18.1207 9.62571 18.0969 9.54727L18.0969 9.54727C18.3348 9.47521 18.4692 9.22398 18.3971 8.98613C18.3734 8.90769 18.3301 8.8405 18.2743 8.78825C18.2918 8.7138 18.2905 8.6339 18.2667 8.55546C18.2429 8.47698 18.1996 8.40977 18.1438 8.35751C18.1526 8.31947 18.1566 8.28032 18.1553 8.24104C18.1532 8.1749 18.1366 8.11002 18.1065 8.05105C18.0765 7.99208 18.0338 7.94045 17.9816 7.89986Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.28814 3.03148C9.36567 3.00488 9.43125 2.95921 9.48143 2.90152C9.55647 2.91626 9.63627 2.91205 9.7138 2.88544L9.71381 2.88544C9.94888 2.80479 10.0741 2.54884 9.99341 2.31376L9.99341 2.31376C9.91275 2.07868 9.6568 1.9535 9.42173 2.03416C9.3442 2.06076 9.27862 2.10642 9.22844 2.16412C9.1534 2.14938 9.0736 2.15359 8.99607 2.18019C8.91851 2.2068 8.85291 2.2525 8.80272 2.31022C8.76438 2.30273 8.72512 2.30025 8.68592 2.30292C8.61989 2.30741 8.55567 2.32641 8.49782 2.35856C8.43998 2.39072 8.38994 2.43524 8.35127 2.48894C8.3126 2.54265 8.28626 2.60423 8.27411 2.66928L8.71646 2.75188M9.28814 3.03148C9.05307 3.11214 8.79712 2.98695 8.71646 2.75188L9.28814 3.03148Z"
        fill="white"
      />
      <path
        d="M7.59119 3.25L9.204 3.93644C9.204 3.93644 9.65572 4.28994 9.55269 4.46045C9.08907 5.22774 7.42596 3.73318 7.42596 3.73318L7.59119 3.25Z"
        fill="#25772E"
      />
      <path
        d="M14.95 8.2L16.1696 8.57561C16.1696 8.57561 16.6992 8.93977 16.5955 9.09356C16.1289 9.7856 13.15 7.75 13.15 7.75L14.95 8.2Z"
        fill="#25772E"
      />
      <path
        d="M10.7412 4.6L11.1906 4.88861C11.1906 4.88861 11.2818 5.1188 11.2069 5.29894C10.87 6.10957 10.576 5.08318 10.576 5.08318L10.7412 4.6Z"
        fill="#25772E"
      />
      <path
        d="M12.5604 3.68187C12.9983 3.76866 13.5303 3.72181 13.5933 4.17133C13.628 4.41954 13.5037 4.94008 13.3847 4.7813C13.1099 4.41482 11.4801 3.72121 11.4801 3.72121C11.4801 3.72121 12.1473 3.59997 12.5604 3.68187Z"
        fill="#25772E"
      />
      <path
        d="M13.0652 6.68611C13.3847 6.76968 13.7573 6.80371 13.8482 7.00946C13.8984 7.12307 13.8639 7.34102 13.7631 7.25838C13.5305 7.06762 12.303 6.59229 12.303 6.59229C12.303 6.59229 12.7638 6.60726 13.0652 6.68611Z"
        fill="#25772E"
      />
      <path
        d="M15.6687 7.10192C16.9324 7.74389 18.0392 7.91254 18.0392 7.91254C18.0392 7.91254 18.0387 8.05971 17.9663 8.12571C17.6404 8.42274 15.5958 7.31509 15.5958 7.31509C15.5958 7.31509 14.405 6.45995 15.6687 7.10192Z"
        fill="#25772E"
      />
      <path
        d="M8.14659 6.09177C8.68555 6.48589 9.22333 6.45997 9.22333 6.45997C9.22333 6.45997 9.1985 6.59881 9.15044 6.67314C8.93416 7.00765 8.07369 6.30494 8.07369 6.30494C8.07369 6.30494 7.60763 5.69764 8.14659 6.09177Z"
        fill="#25772E"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.46044 9.08187C4.55129 9.09988 4.6462 9.11213 4.74013 9.12426C5.09891 9.17059 5.44343 9.21508 5.49332 9.57133C5.52807 9.81954 5.40377 10.3401 5.28473 10.1813C5.00997 9.81482 3.38009 9.12121 3.38009 9.12121C3.38009 9.12121 4.04728 8.99997 4.46044 9.08187ZM1.27729 10.5403C1.2056 10.8149 1.14777 11.0923 1.10385 11.3715C1.76433 15.6911 5.49576 19 10 19C13.4599 19 16.4639 17.0476 17.9702 14.1844C18.0563 13.6957 18.1 13.199 18.1 12.7C18.1 12.7 15.5008 13.3576 12.8066 13.5977L13.1742 13.7109C13.1742 13.7109 13.7038 14.0751 13.6002 14.2289C13.3654 14.5771 12.4943 14.2346 11.6868 13.8083C11.671 13.8702 11.6469 13.9277 11.6153 13.9787C11.5704 14.0513 11.5114 14.109 11.4424 14.1479C11.3735 14.1868 11.2963 14.2058 11.2164 14.2037C11.1365 14.2015 11.0559 14.1782 10.9803 14.1355C10.9423 14.114 10.9061 14.0879 10.8723 14.0578C10.8124 14.1858 10.7116 14.2832 10.5808 14.323C10.4061 14.3761 10.2188 14.3141 10.0762 14.176C10.0176 14.3127 9.91363 14.4173 9.77677 14.4589C9.49473 14.5447 9.1798 14.3303 9.07335 13.9802C9.06674 13.9584 9.0611 13.9367 9.05638 13.915C9.02051 13.9393 8.98108 13.9583 8.93845 13.9713C8.76378 14.0244 8.57649 13.9624 8.43393 13.8243C8.37532 13.961 8.27135 14.0656 8.1345 14.1072C7.85246 14.193 7.53752 13.9786 7.43108 13.6285C7.42447 13.6068 7.41882 13.585 7.4141 13.5633C7.37823 13.5876 7.33879 13.6066 7.29615 13.6196C7.01411 13.7054 6.69918 13.491 6.59273 13.1409C6.56181 13.0392 6.55188 12.9372 6.56027 12.8416C6.27935 12.7451 5.99947 12.6436 5.72347 12.5393C5.46865 12.6406 5.15896 12.7 4.825 12.7C3.95515 12.7 3.25 12.2971 3.25 11.8C3.25 11.7072 3.27457 11.6177 3.32019 11.5335C2.1097 10.9823 1.27729 10.5403 1.27729 10.5403ZM7.69658 15.9918C8.23554 16.3859 8.77332 16.36 8.77332 16.36C8.77332 16.36 8.74848 16.4988 8.70042 16.5731C8.48415 16.9076 7.62368 16.2049 7.62368 16.2049C7.62368 16.2049 7.15762 15.5976 7.69658 15.9918ZM8.94063 11.6386L8.49121 11.35L8.32598 11.8332C8.32598 11.8332 8.62001 12.8596 8.95692 12.0489C9.03178 11.8688 8.94063 11.6386 8.94063 11.6386ZM13.4699 12.8304C13.6014 12.7739 13.7342 12.7168 13.8661 12.6686C14.466 12.4493 15.2425 11.8354 15.2425 11.8354C15.2425 11.8354 12.5949 12.3205 11.9593 12.1464C11.6839 12.071 11.917 12.6959 12.1505 12.9248C12.4856 13.2534 12.9678 13.0462 13.4699 12.8304Z"
        fill="#B76320"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5201 19.8841C11.5346 19.8825 11.5492 19.8806 11.5637 19.8783C12.1932 19.7794 12.8034 19.6217 13.3884 19.4111C13.7181 19.2924 13.937 19.0028 13.9814 18.6781C14.1589 18.5965 14.3336 18.5096 14.5051 18.4176C14.7903 18.5784 15.153 18.5792 15.4468 18.3887C16.4819 17.7177 17.4051 16.8464 18.1521 15.7927C18.2156 15.7032 18.2605 15.6062 18.2878 15.5062C18.3693 15.4421 18.4412 15.363 18.4989 15.2698C18.5539 15.181 18.6077 15.091 18.6603 15C18.7128 14.909 18.7638 14.8174 18.8132 14.7254C18.8285 14.6968 18.8422 14.6678 18.8542 14.6385C18.875 14.6077 18.8941 14.5754 18.9114 14.5415C19.2261 13.9251 19.4788 13.2718 19.6612 12.5898C19.7341 12.3183 19.7951 12.0452 19.8444 11.7711C19.8471 11.7565 19.8493 11.7418 19.8512 11.7272C19.8964 11.4682 19.9315 11.2059 19.9563 10.9405C19.9665 10.8313 19.9569 10.7248 19.9305 10.6246C19.9691 10.5284 19.9918 10.4239 19.9951 10.3143C19.9984 10.2099 20 10.1051 20 10C20 9.89487 19.9984 9.79009 19.9951 9.68568C19.9929 9.61445 19.9826 9.54539 19.965 9.47936C19.9761 9.41057 19.9794 9.33941 19.974 9.26689C19.9544 9.00313 19.9244 8.74055 19.8841 8.47979C19.8825 8.46531 19.8806 8.4508 19.8783 8.43626C19.7794 7.8068 19.6217 7.19662 19.4111 6.61165C19.2924 6.28194 19.0028 6.06298 18.6781 6.01863C18.5965 5.84106 18.5096 5.66644 18.4176 5.49494C18.5784 5.2097 18.5792 4.84701 18.3887 4.55319C17.7178 3.51811 16.8464 2.59494 15.7927 1.84786C15.7032 1.78442 15.6062 1.73946 15.5062 1.71219C15.4421 1.63069 15.363 1.55884 15.2698 1.50111C15.181 1.44611 15.091 1.39231 15 1.33974C14.909 1.28718 14.8174 1.23619 14.7254 1.18679C14.6968 1.17146 14.6678 1.15781 14.6385 1.14581C14.6077 1.12501 14.5754 1.10587 14.5415 1.08856C13.9257 0.774183 13.273 0.521717 12.5918 0.339371C12.3197 0.266196 12.0459 0.204993 11.7711 0.155578C11.7564 0.152934 11.7418 0.15066 11.7271 0.148748C11.4682 0.103637 11.2058 0.068488 10.9405 0.0437105C10.8313 0.0335112 10.7248 0.0430754 10.6246 0.0694669C10.5284 0.0308976 10.4239 0.00824408 10.3143 0.00485447C10.2099 0.00162547 10.1051 0 10 0C9.89487 0 9.79009 0.00162547 9.68568 0.00485453C9.61445 0.00705744 9.54539 0.0173969 9.47936 0.0349539C9.41057 0.0238958 9.33941 0.0206242 9.2669 0.0260139C9.00314 0.0456183 8.74056 0.0756367 8.4798 0.115895C8.46532 0.11747 8.4508 0.119397 8.43626 0.121682C7.8068 0.220604 7.19662 0.378268 6.61165 0.588911C6.28194 0.707636 6.06298 0.997228 6.01863 1.32195C5.84107 1.40355 5.66644 1.49043 5.49495 1.58241C5.20971 1.42158 4.84701 1.42079 4.5532 1.61126C3.51812 2.28225 2.59495 3.15357 1.84787 4.20733C1.78443 4.29681 1.73946 4.39382 1.71219 4.49384C1.6307 4.55785 1.55885 4.63699 1.50111 4.73021C1.44611 4.81902 1.39231 4.90895 1.33975 5C1.28718 5.09104 1.2362 5.1826 1.18679 5.27463C1.17147 5.30318 1.15783 5.33217 1.14583 5.36151C1.12503 5.39226 1.10587 5.42462 1.08856 5.45854C0.773342 6.07595 0.520367 6.73047 0.337909 7.41367C0.265384 7.684 0.204669 7.95596 0.155585 8.22885C0.152951 8.2435 0.150683 8.25812 0.148776 8.27272C0.103651 8.53172 0.0684931 8.7941 0.0437105 9.05947C0.0335112 9.16868 0.0430754 9.27518 0.0694669 9.37543C0.0308976 9.47162 0.00824408 9.57608 0.00485447 9.68568C0.00162547 9.79009 0 9.89487 0 10C0 10.1051 0.00162547 10.2099 0.00485453 10.3143C0.00705761 10.3856 0.0173986 10.4546 0.0349581 10.5207C0.0239021 10.5894 0.0206315 10.6606 0.0260209 10.7331C0.0456214 10.9968 0.0756317 11.2593 0.115878 11.52C0.117456 11.5346 0.119389 11.5491 0.121682 11.5637C0.220604 12.1932 0.378268 12.8034 0.588911 13.3884C0.707636 13.7181 0.997228 13.937 1.32195 13.9814C1.40355 14.1589 1.49044 14.3336 1.58241 14.5051C1.42159 14.7903 1.4208 15.153 1.61126 15.4468C2.28226 16.4819 3.15358 17.4051 4.20734 18.1521C4.29682 18.2156 4.39383 18.2605 4.49384 18.2878C4.55786 18.3693 4.637 18.4412 4.73022 18.4989C4.81903 18.5539 4.90896 18.6077 5 18.6603C5.09105 18.7128 5.18261 18.7638 5.27464 18.8132C5.30318 18.8285 5.33217 18.8422 5.36149 18.8542C5.39225 18.875 5.42462 18.8941 5.45854 18.9114C6.07629 19.2268 6.73121 19.4799 7.41482 19.6624C7.68477 19.7348 7.95635 19.7954 8.22886 19.8444C8.24349 19.847 8.2581 19.8493 8.27269 19.8512C8.53169 19.8963 8.79409 19.9315 9.05947 19.9563C9.16868 19.9665 9.27518 19.9569 9.37543 19.9305C9.47162 19.9691 9.57608 19.9918 9.68568 19.9951C9.79009 19.9984 9.89487 20 10 20C10.1051 20 10.2099 19.9984 10.3143 19.9951C10.3856 19.9929 10.4546 19.9826 10.5207 19.965C10.5894 19.9761 10.6606 19.9794 10.7331 19.974C10.9968 19.9544 11.2593 19.9244 11.5201 19.8841ZM18.3419 12.2443C18.049 12.3085 17.794 12.5161 17.6827 12.8183C17.5233 13.2511 17.3248 13.6768 17.0857 14.0909C16.9476 14.3301 16.7994 14.5595 16.642 14.7789C16.5799 14.865 16.5162 14.9498 16.4509 15.0334C16.4434 15.043 16.4361 15.0526 16.4291 15.0624C16.3809 15.1238 16.3318 15.1845 16.2821 15.2442C16.0766 15.4911 16.024 15.8146 16.1138 16.0998C15.8762 16.338 15.6248 16.5623 15.3609 16.7715C15.0877 16.6497 14.7602 16.6651 14.4914 16.8412C14.0414 17.136 13.565 17.3846 13.0699 17.5845C12.7711 17.7052 12.5714 17.9667 12.5164 18.2617C12.42 18.291 12.3231 18.3187 12.2257 18.3446C12.0237 18.1242 11.7171 18.008 11.4006 18.0626C10.9461 18.1409 10.4782 18.1818 10 18.1818C9.52182 18.1818 9.05392 18.1409 8.59942 18.0626C8.282 18.0078 7.97469 18.1249 7.77264 18.3464L7.76884 18.3454C7.76448 18.3442 7.76011 18.3431 7.75575 18.3419C7.69154 18.049 7.48391 17.794 7.18167 17.6827C6.74889 17.5233 6.32321 17.3248 5.90909 17.0857C5.66929 16.9472 5.43933 16.7986 5.2194 16.6407C5.13388 16.579 5.04959 16.5157 4.96658 16.4509C4.95706 16.4434 4.94744 16.4362 4.93771 16.4292C4.87621 16.3809 4.81557 16.3319 4.75578 16.2821C4.50891 16.0765 4.18535 16.024 3.90015 16.1138C3.66201 15.8762 3.43768 15.6248 3.22845 15.3609C3.35029 15.0877 3.33495 14.7602 3.15885 14.4914C2.86397 14.0414 2.61545 13.5649 2.41551 13.0699C2.29482 12.7711 2.03329 12.5713 1.73834 12.5164C1.709 12.42 1.68134 12.3231 1.65537 12.2257C1.87577 12.0237 1.992 11.7171 1.93744 11.4006C1.85911 10.9461 1.81818 10.4782 1.81818 10C1.81818 9.52182 1.85911 9.05392 1.93744 8.59942C1.99215 8.282 1.87514 7.9747 1.65359 7.77264L1.6546 7.76884C1.65577 7.76447 1.65694 7.76011 1.65812 7.75574C1.95102 7.69154 2.206 7.4839 2.31733 7.18166C2.47674 6.74888 2.67525 6.32321 2.91434 5.90909C3.05241 5.66995 3.20057 5.44061 3.35796 5.22124C3.42006 5.13509 3.48381 5.05019 3.54915 4.96658C3.55662 4.95702 3.56387 4.94736 3.5709 4.9376C3.61916 4.87614 3.66817 4.81553 3.71792 4.75578C3.92345 4.50891 3.97604 4.18534 3.88621 3.90014C4.1238 3.66201 4.37521 3.43768 4.63914 3.22845C4.91228 3.35029 5.23982 3.33494 5.50857 3.15884C5.95858 2.86396 6.43505 2.61544 6.93011 2.4155C7.22894 2.29481 7.42866 2.03329 7.48364 1.73833C7.58003 1.70899 7.67692 1.68133 7.77426 1.65537C7.97634 1.87577 8.28285 1.99201 8.59941 1.93744C9.05392 1.85911 9.52182 1.81818 10 1.81818C10.4782 1.81818 10.9461 1.85911 11.4006 1.93744C11.718 1.99215 12.0253 1.87514 12.2274 1.65359C12.2313 1.65464 12.2352 1.65569 12.2392 1.65674L12.2443 1.65811C12.3085 1.95101 12.5161 2.206 12.8183 2.31732C13.2511 2.47673 13.6768 2.67524 14.0909 2.91433C14.3294 3.05201 14.5581 3.19973 14.7769 3.35662C14.8637 3.41914 14.9492 3.48334 15.0334 3.54915C15.043 3.55664 15.0527 3.56391 15.0625 3.57096C15.1239 3.6192 15.1845 3.66819 15.2442 3.71791C15.4911 3.92344 15.8146 3.97603 16.0998 3.8862C16.338 4.12379 16.5623 4.37521 16.7716 4.63914C16.6497 4.91229 16.6651 5.23982 16.8412 5.50856C17.136 5.95858 17.3846 6.43505 17.5845 6.9301C17.7052 7.22894 17.9667 7.42865 18.2617 7.48363C18.291 7.58003 18.3187 7.67692 18.3446 7.77426C18.1242 7.97634 18.008 8.28285 18.0626 8.59941C18.1409 9.05392 18.1818 9.52182 18.1818 10C18.1818 10.4782 18.1409 10.9461 18.0626 11.4006C18.0078 11.718 18.1249 12.0253 18.3464 12.2274C18.3455 12.2307 18.3446 12.234 18.3437 12.2374C18.3431 12.2397 18.3425 12.242 18.3419 12.2443Z"
        fill="#723D16"
      />
    </svg>
  );
};

export type { Props as MeatBallIconProps };
export { MeatBallIcon };
