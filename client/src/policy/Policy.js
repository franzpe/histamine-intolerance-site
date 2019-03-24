import React from 'react';
import { withStyles, Typography, Paper } from '@material-ui/core';

const styles = theme => ({
  paper: {
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`
  },
  section: {
    marginBottom: theme.spacing.unit * 2.5
  },
  list: {
    listStyleType: 'circle',
    padding: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px`
  },
  subtitle: {
    marginTop: theme.spacing.unit * 2
  }
});

function Policy({ classes }) {
  return (
    <Paper className={classes.paper}>
      <Typography component="h4" variant="h4" gutterBottom={true}>
        Zásady ochrany osobných údajov
      </Typography>
      <Typography variant="h6" component="h4" gutterBottom={true} className={classes.subtitle}>
        Kto sme?
      </Typography>
      <Typography variant="body2" component="p" gutterBottom={true}>
        Prevádzkovateľom webu {window.location.origin} je Ing. František Poboček - Applance, IČO:
        1124165306, zapísaný v Živnostenskom registri Okresného úradu Galanta.
      </Typography>
      <Typography variant="body2" component="p" gutterBottom={true}>
        Dbáme na to, aby sme Vaše osobné údaje spracúvali v súlade s príslušnými právnymi predpismi
        (najmä Zákon o ochrane osobných údajov a Nariadenie o ochrane osobných údajov tzv. GDPR) a
        týmito informáciami. Podľa zákona sa za spracovanie osobných údajov považuje aj to ak osobné
        údaje máme k dispozícii, aj keď s nimi ďalej nijako nenakladáme.
      </Typography>
      <Typography variant="h6" component="h4" gutterBottom={true} className={classes.subtitle}>
        Aké údaje teda uchovávame?
      </Typography>
      <Typography variant="body2" component="p" gutterBottom={true}>
        Počas vašej návštevy našich stránok zaznamenávame IP adresu, ktorú vám pridelil váš
        poskytovateľ internetu, z akých stránok ste navštívili našu stránku, ako dlho ste na našej
        stránke, ktoré konkrétne podstránky si prezeráte a pod. Tieto informácie sú považované za
        osobný údaj, keďže ide o Váš online identifikátor, a preto s týmto údajom nakladáme so
        zvýšenou starostlivosťou. Taktiež spracovávame Vašu e-mailovú adresu a pri prihlásení
        pomocou Facebooku zbierame naviac Vaše meno.
      </Typography>
      <Typography variant="h6" component="h4" gutterBottom={true} className={classes.subtitle}>
        Cookies
      </Typography>
      <Typography variant="body2" component="p" gutterBottom={true}>
        Používame cookies k tomu, aby sme zistili preferencie navštevníkov web stránok a vedeli na
        základe toho prispôsobiť našu ponuku na mieru konkrétnemu návštevníkovi. Cookies sa môžu
        používať k tomu, aby sme zistili, či už ste naše stránky z vášho počítača niekedy
        navštívili.Cookies sú textové súbory, ktoré uloží váš internetový prehliadač na váš disk v
        počítači. Ak si neprajete cookies ukladať, môžete ich deaktivovať vo vašom internetovom
        prehliadači.
      </Typography>
      <Typography variant="h6" component="h4" gutterBottom={true} className={classes.subtitle}>
        Ste v bezpečí
      </Typography>
      <Typography variant="body2" component="p" gutterBottom={true}>
        Ste v bezpečí Je pre nás prvoradé, aby vaše osobné údaje boli v bezpečí. Implementovali sme
        rôzne bezpečnostné systémy na ochranu údajov. S vylepšovaním technológií vylepšujeme aj
        tieto bezpečnostné systémy.
      </Typography>
      <Typography variant="h6" component="h4" gutterBottom={true} className={classes.subtitle}>
        Vaše práva
      </Typography>
      <Typography variant="body2" component="p" gutterBottom={true}>
        V súvislosti s ochranou vašich osobných údajov máte široké práva:
      </Typography>
      <ul className={classes.list}>
        <li>
          <Typography variant="body2" component="p" gutterBottom={true}>
            Máte právo požiadať nás o vymazanie vašich osobných údajov, ktoré spracúvame ak už nie
            je potrebná ich evidencia (netrvá už účel spracovania). V tomto prípade vymažeme alebo
            anonymizujeme všetky Vaše osobné údaje, ktorými disponujeme z databáz, ktoré
            prevádzkujeme. Urobíme tak do 30 pracovných dní od doručenia vašej žiadosti.
          </Typography>
        </li>
        <li>
          <Typography variant="body2" component="p" gutterBottom={true}>
            Ak sa u Vás niečo zmení a vaše osobné údaje už nie sú aktuálne, máte právo požiadať nás
            o opravu nesprávnych osobných údajov, ktoré spracúvame.
          </Typography>
        </li>
        <li>
          <Typography variant="body2" component="p" gutterBottom={true}>
            Máte právo obmedziť účel spracovania vašich osobných údajov alebo ich rozsah.
          </Typography>
        </li>
        <li>
          <Typography variant="body2" component="p" gutterBottom={true}>
            Máte právo požiadať nás o prístup k Vašim osobným údajom, ktoré spracúvame. A my Vám v
            lehote 30 pracovných dní doložíme, aké Vaše údaje spracovávame.
          </Typography>
        </li>
        <li>
          <Typography variant="body2" component="p" gutterBottom={true}>
            Ak chcete od nás Vaše osobné údaje vziať a preniesť ich k inému subjektu, údaje, ktoré o
            vás máme Vám poskytneme v štruktúrovanom, bežne používanom a strojovo čitateľnom formáte
            do 30 dní.
          </Typography>
        </li>
        <li>
          <Typography variant="body2" component="p" gutterBottom={true}>
            Máte právo odvolať súhlas so spracúvaním vašich osobných údajov. Po doručení odvolania
            nebudeme Vaše osobné údaje ďalej spracúvať. Odvolanie Vášho súhlasu nemá vplyv na
            zákonnosť spracúvania, ktoré sme vykonávali pred jeho odvolaním.
          </Typography>
        </li>
        <li>
          <Typography variant="body2" component="p" gutterBottom={true}>
            Máte právo podať sťažnosť na nezákonné spracúvanie osobných údajov. S vašou sťažnosťou
            sa môžete kedykoľvek obrátiť na nás, alebo ju môžete podať na Úrad na ochranu osobných
            údajov Slovenskej republiky.
          </Typography>
        </li>
      </ul>
      <Typography variant="body2" component="p" gutterBottom={true}>
        Pokiaľ si chcete ktorékoľvek z týchto práv uplatniť, pošlite nám, prosím, e-mail na
        frantisekpobocek@gmail.com.
      </Typography>
      <Typography variant="h6" component="h4" gutterBottom={true} className={classes.subtitle}>
        Neposkytujeme Vaše údaje tretím stranám
      </Typography>
      <Typography variant="body2" component="p" gutterBottom={true}>
        Nepredávame, neobchodujeme ani žiadnym iným spôsobom neposkytujeme vaše osobné údaje tretím
        stranám. Podľa nás to nie je fér a zároveň vaše osobné údaje sú to najcitlivejšie, čo nám
        môžete poskytnúť. Vaše osobné údaje nesprístupňujeme tretím stranám iným ako Google
        Analytics od spoločnosti Google. Odovzdanie vašich osobných údajov štátnym organizáciám je
        len na základe zákona alebo právoplatných úradných či súdnych rozhodnutí v súlade s právnymi
        predpismi Slovenskej republiky.
      </Typography>
      <Typography variant="body2" component="p" gutterBottom={true} className={classes.subtitle}>
        Tieto informácie o spracúvaní a ochrane osobných údajov sú platné od 25.5.2018.
      </Typography>
    </Paper>
  );
}

export default withStyles(styles)(Policy);
