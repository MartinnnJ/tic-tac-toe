import { ThemeProvider } from 'styled-components';
import { theme } from './styles/Theme.styled.ts';
import { GlobalStyles } from './styles/Global.styled.ts';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme.defaultTheme}>
    <GlobalStyles />
    <App />
  </ThemeProvider>
)
