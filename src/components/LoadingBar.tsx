import { useTheme } from '../contexts/ThemeContext';

const LoadingBar = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <style>
        {`
          .loader {
            width: 120px;
            height: 20px;
            border-radius: 20px;
            background:
              repeating-linear-gradient(135deg, var(--primary-color) 0 10px, var(--secondary-color) 0 20px) 0/0% no-repeat,
              repeating-linear-gradient(135deg, var(--bg-color) 0 10px, var(--bg-alt-color) 0 20px) 0/100%;
            animation: l3 2s infinite;
          }

          .loader-light {
            --primary-color: #f03355;
            --secondary-color: #ffa516;
            --bg-color: #ddd;
            --bg-alt-color: #eee;
          }

          .loader-dark {
            --primary-color: #ff4d6d;
            --secondary-color: #ffb649;
            --bg-color: #333;
            --bg-alt-color: #444;
          }

          @keyframes l3 {
            100% { background-size: 100% }
          }
        `}
      </style>
      <div className={`loader ${isDarkMode ? 'loader-dark' : 'loader-light'}`}></div>
    </div>
  );
};

export default LoadingBar;
