# Repo
## Git Remotes

    danegh	git@github.com:ProyectoDane/billetera.git (fetch)
    danegh	git@github.com:ProyectoDane/billetera.git (push)
    origin	git@github.com:intive-FDV/dane_billetera_JS.git (fetch)
    origin	git@github.com:intive-FDV/dane_billetera_JS.git (push)

## Pushear a Dane
Estando parado en master con todo comiteado, pusheamos a `master` en el repo de Dane 

    git push danegh master

# Actualizar version para build en Playstore

Hay que actualizar 2 (dos) valores en el `app.json` de manera incremental:

- expo > version
- android > versionCode


```josn
{
    "expo": {
        ...
        "version": "1.0.8",
    ...
    },
    
    ...    
    
    "android": {
      ...
      "versionCode": 6,
      ...
    }
    ...
}      
```

# Adding new Bills & Coins

## Add the asset file (image) for the bill/coin

Bills goes into `assets/billetes` folder. Dimensions must be 240 x 101 png file.

Coins goes into `assets/monedas` folder. Dimensions must be 240 x 101 png file.

## Add entry in the database

Edit `src/constants/bdStructure.js` and add the `INSERT` statement as needed (copy it from the existing ones)

## Add to ItemMoney.js

edit `src/screens/AddRemove/components/ItemMoney/ItemMoney.js` and

1) import the asset (copy and edit from any other asset `import` in the file).
2) add an entry in the `imageMap` object following the structure: `'<file_name>': <imported asset reference>`. 

## Restart the app and test

1) Check you can add money to both wallet and savings
2) check you can see your bills/coins in wallet and savings
3) test the Buy flow with both: "suggested" and "let me choose"

You are done!