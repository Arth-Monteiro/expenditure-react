import { Box } from '@mui/material';
import UserMenu from './UserMenu';

interface IHeaderProps {
  children?: React.ReactNode;
}
export default function Header({ children }: IHeaderProps) {
  return (
    <Box component={'header'}>
      <Box
        sx={{
          backgroundColor: '#E57373',
          margin: '0 auto',
          padding: '8px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box
          component={'h1'}
          sx={{
            flex: '1',
            textAlign: 'center',
            fontWeight: '500',
            fontSize: '26px',
          }}
        >
          {children}
        </Box>
        <UserMenu />
      </Box>
    </Box>
  );
}
