import * as React from "react";

export const DonutUnstyled = (props: React.ComponentProps<"svg">) => {
  return (
    <svg viewBox="0 0 63 63" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.3574 0.18423C21.6439 0.925893 15.1904 3.8155 10.2396 8.49665C9.57498 9.12273 7.899 11.4344 7.22477 12.3494C5.92445 13.2163 4.74932 14.2759 3.94986 15.7496C3.51642 16.5587 3.73802 16.26 3.52611 16.5586C2.95783 17.3966 2.57255 18.5429 2.20653 19.4868C1.42634 21.4325 0.858018 23.4648 0.48237 25.5357C-1.39587 36.025 2.29319 47.0632 10.1144 54.3065C12.4646 56.4833 15.1422 58.2941 18.0318 59.6618C30.4089 65.5181 45.3674 62.6188 54.6334 52.5341C57.0318 49.9238 58.9872 46.9283 60.3838 43.6824C61.6167 40.8217 62.3968 37.778 62.734 34.6861C64.1113 21.9526 57.34 9.35392 45.9646 3.46877C42.5934 1.72538 38.914 0.608037 35.1286 0.18423C32.8747 -0.0662023 30.6017 -0.0565703 28.3574 0.18423ZM30.6209 18.851C37.5271 18.3213 43.5085 23.6671 43.7686 30.5925C43.836 32.1722 43.5663 33.7421 43.0173 35.2254C40.0314 43.2682 29.7926 45.7051 23.5125 39.8585C20.6903 37.229 19.3033 33.2316 19.8716 29.4173C20.0064 28.5215 19.8813 29.4174 21.3742 25.1986C21.6536 24.6785 21.6728 24.1198 21.8558 23.5707C22.164 23.1758 22.4626 22.7905 22.819 22.4341C24.8899 20.3536 27.6928 19.0726 30.6209 18.851Z"
        fill="current"
      />
    </svg>
  );
};
