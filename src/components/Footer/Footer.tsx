import "./Footer.style.css"
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

const Grid = styled(MuiGrid)(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& [role="separator"]': {
      margin: theme.spacing(0, 2),
    },
  }));


  export const Footer = () => {
    const ulAnia = (
            <ul className="ul-anna footer-ul">
                <li>Anna Wiśniowska</li>
                <li>Junior Frontend Developer</li>
                <li>LinkedIn:</li>
                <li>GitHub</li>
                <li>tel. +48</li>
            </ul>)
    const ulBeata = (        
            <ul className="ul-beata footer-ul">
                <li>Beata Gonera</li>
                <li>Junior Frontend Developer</li>
                <li><a href='https://www.linkedin.com/in/beataiwonagonera/'>LinkedIn</a></li>
                <li><a href='https://github.com/BeataGonera'>GitHub</a></li>
                <li>tel. +48 665 725 451</li>
            </ul>)
    const ulMilosz = (        
            <ul className="ul-milosz footer-ul">
                <li>Miłosz Kuźnia</li>
                <li>Junior Frontend Developer</li>
                <li>LinkedIn:</li>
                <li>GitHub</li>
                <li>tel. +48</li>
            </ul>)
    const ulPiotr = (        
            <ul className="ul-piotr footer-ul">
                <li>Piotr Rajmański</li>
                <li>Junior Frontend Developer</li>
                <li>LinkedIn</li>
                <li>GitHub</li>
                <li>tel. +48</li>
            </ul>)

    return (
        <Grid sx={{
            mt: 20,
            width: '100vw',
            p: '90px', 
            display: 'flex', 
            justifyContent: 'space-between'
        }} container>
            <Grid item xs>
                {ulAnia}
            </Grid>
            <Divider orientation="vertical" flexItem>
            </Divider>
            <Grid item xs>
                {ulBeata}
            </Grid>
            <Divider orientation="vertical" flexItem>
            </Divider>
            <Grid item xs>
                {ulMilosz}
            </Grid>
            <Divider orientation="vertical" flexItem>
            </Divider>
            <Grid item xs>
                {ulPiotr}
            </Grid>
        </Grid>
    )}