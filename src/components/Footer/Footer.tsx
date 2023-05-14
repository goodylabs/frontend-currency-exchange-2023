import { Grid, Link } from '@mui/material';

export function Footer() {
  return (
    <Grid
      container
      justifyContent={'center'}
      alignItems={'center'}
      height={160}
      marginTop={4}
      bgcolor={'#17252A'}
      columnGap={8}
    >
      <Link
        href='https://github.com/macszl'
        target='_blank'
        color='white'
        underline='none'
      >
        GitHub
      </Link>
      <Link
        href='https://www.linkedin.com/in/maciej-szlendak-5722b9229/'
        target='_blank'
        color='white'
        underline='none'
      >
        LinkedIn
      </Link>
    </Grid>
  );
}
