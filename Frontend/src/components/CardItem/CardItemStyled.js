import { Button, Card, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CardWrapper = styled(Card)({
  maxWidth: '700px',
  marginBottom: '20px',
});

export const CardImgWrapper = styled(CardMedia)({
  maxHeight: '500px',
  height: '100%',
});

export const CardTitle = styled(Typography)({
  '&.MuiTypography-h2': {
    fontSize: '22px',
    marginBottom: '20px',
    '@media(max-width: 650px)': {
      fontSize: '18px',
    },
  },
});

export const CartDescription = styled(Typography)({
  margin: '20px 0',
});

export const CardButton = styled(Button)(({ theme }) => ({
  '&.MuiButton-root': {
    padding: '10px 15px',
    borderRadius: '10px',
    marginBottom: '10px',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.contrastText,
    },
  },
}));
