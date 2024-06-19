import { createTheme } from '@mui/material/styles';
import TransferForm from '../components/send-tx-abstraction-fee.component';
import { NextPage } from 'next';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    common: {
      black: '#252829',
    },
    background: {
      default: '#1C1E1F',
      paper: '#30363B',
    },
    text: {
      secondary: '#969DA3',
    },
  },
});

const Transfer: NextPage = () => {
  return (
    <div>
      <TransferForm />
    </div>
  );
};

export default Transfer;
