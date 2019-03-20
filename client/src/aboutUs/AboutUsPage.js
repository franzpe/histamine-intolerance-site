import React from 'react';
import { withStyles, Paper, Typography } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import WebIcon from '@material-ui/icons/Web';
import { ReactComponent as FacebookSvg } from '_assets/facebook_icon.svg';
import SemiBold from '_components/typography/SemiBold';

const styles = theme => ({
  paper: {
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.secondary.main
    }
  },
  emailIcon: {
    verticalAlign: 'middle',
    fontSize: '30px'
  },
  facebookIcon: {
    verticalAlign: 'middle',
    margin: '0 3px',
    width: '24px',
    height: '24px',
    '& g path:first-child': {
      fill: 'rgba(0, 0, 0, 0.87)'
    }
  },
  facebookLink: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.secondary.main,
      '& g path:first-child': {
        fill: theme.palette.secondary.main
      }
    }
  },
  section: {
    marginBottom: theme.spacing.unit * 2.5
  },
  x: {
    fontWeight: 600,
    color: theme.palette.secondary.main
  }
});

function AboutPage({ classes }) {
  return (
    <Paper className={classes.paper}>
      <Typography component="h4" variant="h4" gutterBottom={true}>
        O nás
      </Typography>
      <div className={classes.section}>
        <div className={classes.section}>
          <Typography component="div" variant="body1" align="justify" gutterBottom={true}>
            Stránka <span className={classes.x}>BEZ</span>HISTAMÍNOVO bola vytvorená v snahe uľahčiť
            život všetkým tým, ktorí bojujú s histamínovou intoleranciou. Ľudia trpiaci touto
            intoleranciou majú problémy hlavne so stravou, často nevedia, aké potraviny sú pre nich
            vhodné alebo sa boja niektoré čo i len vyskúšať z dôvodu obavy o ich zdravotný stav. Ak
            patríte medzi týchto ľudí, ste na správnom mieste.
          </Typography>
        </div>
        <Typography component="div" variant="body1" align="justify" gutterBottom={true}>
          <SemiBold>Zoznam potravín</SemiBold> vychádza zo&nbsp;
          <a
            href="https://www.mastzellaktivierung.info/en/downloads.html#lm_sk"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
            style={{ textDecoration: 'underline' }}
          >
            švajčiarskeho zoznamu
          </a>
          &nbsp;, pričom je možné hodnotiť jednotlivé potraviny v závislosti od toho, či ich znášate
          alebo nie. Pomocou tejto funkcie sa vypočíta znášanlivosť jednotlivých potravín v
          percentách. To znamená, že na základe znášanlivosti danej potraviny inými ľuďmi sa môžete
          rozhodnúť, či ju vyskúšate. Čím vyššia je znášanlivosť potraviny u iných ľudí, tým vyššia
          je šanca, že ju budete dobre znášať aj vy. Samozrejme táto funkcia slúži ako nástroj,
          ktorý vám môže uľahčiť výber potravín, avšak stopercentná istota neexistuje práve kvôli
          individuálnej znášanlivosti každého z nás.
        </Typography>
        <Typography component="div" variant="body1" align="justify" gutterBottom={true}>
          Po ohodnotení môžete v profile nájsť váš osobný zoznam potravín, v ktorom sa nachádzajú
          všetky potraviny, ktoré ste už ohodnotili. Tento zoznam vám môže pomôcť pri rýchlom
          vyhľadávaní vami znášaných/neznášaných potravín. Môžete ho využívať napr. pri každodennom
          varení či nakupovaní.
        </Typography>
        <Typography component="div" variant="body1" align="justify" gutterBottom={true}>
          <SemiBold>Recepty</SemiBold> obsahujú ingrediencie, u ktorých je podobne ako v zozname
          potravín vidieť ich znášanlivosť v percentách. Po prihlásení sa na našej stránke a zároveň
          ohodnotení danej ingrediencie v zozname potravín môžete vidieť, či je pre vás vhodná alebo
          nevhodná. Jednotlivé recepty je možné taktiež hodnotiť podobne ako v zozname potravín.
        </Typography>
        <Typography component="div" variant="body1" align="justify" gutterBottom={true}>
          Verím, že táto stránka dokáže uľahčiť každodenný proces nákupu, prípravy a varenia jedál,
          ktoré budú pre nás vhodné, zdravé a zároveň aj chutné.
        </Typography>
      </div>
      <Typography component="h6" variant="h6">
        Kontakt
      </Typography>
      <Typography component="span" variant="body1">
        Ing. František Poboček (Web developer)
      </Typography>
      <Typography component="span" variant="body1">
        <a href="https://frantisekpobocek.com" className={classes.link}>
          <WebIcon className={classes.emailIcon} /> - frantisekpobocek.com
        </a>
      </Typography>
      <Typography component="span" variant="body1">
        <a href="mailto:pobocekfrantisek@gmail.com" className={classes.link}>
          <EmailIcon className={classes.emailIcon} /> - pobocekfrantisek@gmail.com
        </a>
      </Typography>
      <Typography component="span" variant="body1">
        <a
          href="https://facebook.com/FranzPeo"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.facebookLink}
        >
          <FacebookSvg className={classes.facebookIcon} /> - facebook.com/FranzPeo
        </a>
      </Typography>
    </Paper>
  );
}

export default withStyles(styles)(AboutPage);
