import * as React from "react";

export const Scribble3 = (props: React.ComponentProps<"svg">) => {
  return (
    <svg
      width="461"
      height="363"
      viewBox="0 0 461 363"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M336.471 362.871C338.951 362.852 341.422 362.736 343.906 362.543C358.511 361.378 372.777 357.053 385.714 350.205C425.757 329.005 451.187 285.738 458.135 241.845C459.369 234.043 460.036 226.164 460.121 218.275C460.273 204.386 458.712 190.42 454.944 177.031C448.817 155.263 436.871 135.498 420.691 119.721C418.006 117.11 415.21 114.625 412.323 112.227C431.378 81.578 445.639 48.1066 458.677 14.5294C460.655 9.4245 458.116 3.68399 453.018 1.6998C447.92 -0.274749 442.174 2.26798 440.196 7.36331C427.768 39.3897 414.263 71.3391 396.189 100.64C382.02 91.8745 366.352 85.4788 350.166 81.7416C336.945 78.6882 323.292 77.3397 309.742 78.3415C289.748 79.8152 268.792 86.7118 255.593 102.566C242.83 117.9 238.943 140.632 248.79 158.461C253.622 167.216 261.274 174.093 270.041 178.784C289.484 189.177 313.175 189.042 333.853 182.579C353.332 176.482 370.657 164.663 384.601 149.888C390.768 143.348 396.113 136.182 401.277 128.842C413.025 138.917 422.895 151.121 429.63 165.27C434.574 175.654 437.759 186.808 439.292 198.193C440.612 207.998 440.854 217.957 440.075 227.811C439.495 235.151 438.333 242.452 436.643 249.608C427.338 289.051 400.254 327.714 360.039 339.783C353.096 341.873 345.91 343.058 338.669 343.337C329.62 343.694 320.54 342.595 311.789 340.293C304.25 338.319 296.96 335.448 289.996 331.962C286.26 330.083 282.584 328.07 279.1 325.759C253.024 308.46 238.673 278.138 228.773 249.454C224.982 238.474 221.793 227.329 218.78 216.108C212.116 191.296 206.817 166.147 200.6 141.219C195.793 121.955 190.456 102.711 183.201 84.2075C176.454 66.9951 167.958 50.1775 155.961 35.9896C150.608 29.6518 144.56 23.9112 137.841 19.0374C131.703 14.5971 124.996 10.8983 118.065 7.84494C107.652 3.25049 96.472 0.255037 85.0455 0.0142235C79.7422 -0.0917026 74.4349 0.399326 69.2433 1.49738C45.2105 6.57343 26.8201 24.123 14.1897 44.4176C8.96048 52.8167 4.6829 61.7746 1.06702 70.9924C-33.5378 52.393 -72.9819 42.8381 -112.32 46.4597C-126.968 47.8082 -141.445 50.9481 -155.363 55.7063C-171.666 61.2736 -187.194 69.0564 -201.597 78.4861C-208.487 83.0035 -215.068 87.9061 -221.493 93.0592C-225.532 96.2956 -226.175 102.2 -222.938 106.236C-219.7 110.281 -213.824 110.927 -209.784 107.681C-203.826 102.913 -197.692 98.357 -191.302 94.167C-178.978 86.1051 -165.77 79.353 -151.902 74.3636C-139.393 69.8655 -126.352 66.8217 -113.133 65.3961C-75.6336 61.3411 -37.8241 70.6937 -5.0743 88.9656C-10.5212 107.97 -13.4792 127.783 -13.5322 147.567C-13.5736 163.103 -11.8793 178.89 -6.94002 193.685C-1.91981 208.711 7.12654 223.438 21.8953 230.46C24.3736 231.645 26.9742 232.579 29.6317 233.263C33.4855 234.255 37.4529 234.698 41.4309 234.679C47.6281 234.64 53.7907 233.465 59.671 231.548C65.4059 229.68 70.9164 227.05 75.7748 223.448C78.9148 221.126 81.7553 218.391 84.1729 215.328C85.8498 213.189 87.3091 210.907 88.5372 208.489C95.7063 194.378 94.0322 177.744 88.959 163.248C84.5456 150.649 77.6077 138.985 69.5737 128.361C55.9521 110.358 38.9063 94.9569 20.2097 82.3678C19.3515 81.7899 18.4278 81.3081 17.5609 80.7495C21.1767 71.0597 25.593 61.6686 31.1969 52.9613C41.7738 36.5388 57.1657 21.8691 77.3399 19.4034C81.8063 18.8543 86.3382 18.9315 90.7949 19.519C97.884 20.463 104.77 22.7071 111.263 25.6641C117.933 28.7079 124.327 32.4644 130.014 37.0974C139.384 44.7452 146.835 54.4445 152.89 64.8567C161.064 78.9001 166.884 94.1863 171.854 109.607C177.388 126.791 181.681 144.35 185.85 161.899C190.783 182.656 195.445 203.471 200.961 224.083C207.706 249.29 215.821 274.565 228.713 297.373C237.342 312.65 248.311 326.751 262.244 337.529C269.573 343.202 277.664 347.768 286.084 351.621C301.881 358.835 319.108 363.006 336.471 362.871ZM40.2269 215.809C37.9297 215.742 35.6267 215.415 33.4238 214.75C20.4688 210.849 13.6561 196.931 10.0961 184.92C9.37178 182.483 8.76302 180.007 8.23036 177.513C5.28972 163.749 4.85533 149.483 5.82237 135.469C6.66035 123.323 8.60792 111.235 11.6622 99.4357C26.8346 109.906 40.7981 122.302 52.2669 136.731C59.5198 145.862 65.9077 155.831 70.1766 166.715C74.7557 178.389 77.7387 193.897 68.8214 204.367C67.3487 206.1 65.6091 207.632 63.7348 208.913C59.9157 211.523 55.5456 213.238 51.0928 214.422C47.5607 215.357 43.889 215.906 40.2269 215.809ZM302.608 167.312C297.274 167.091 291.968 166.214 286.836 164.548C275.365 160.811 264.753 152.575 263.147 139.919C262.801 137.193 262.917 134.419 263.358 131.703C263.869 128.563 264.766 125.452 266.097 122.552C273.203 107.083 290.785 100.389 306.642 98.4436C309.304 98.1161 311.998 97.9136 314.678 97.8173C318.295 97.6729 321.903 97.7404 325.514 97.962C329.723 98.222 333.907 98.7133 338.066 99.4067C354.698 102.19 370.828 108.413 385.262 117.284C381.627 122.524 377.864 127.686 373.704 132.493C366.384 140.94 357.915 148.424 348.39 154.309C334.973 162.602 318.612 167.967 302.608 167.312Z"
        fill="#DE6B59"
      />
    </svg>
  );
};
