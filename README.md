# planning-poker

## Database (Mongo)
planning

### Collections
* game
* userstory

## SignalR

Create Signal R Resource in Azure
```
az signalr create --name pp-signalr -g planning-poker --sku Free_F1
``` 
Display List -- Update below url in appsetrings.json
```
az signalr list --output table
``` 
Get Connection String
```
az signalr key list --name pp-signalr -g planning-poker --output table
``` 
Delete Signal R Resource in Azure
```
az signalr create --name pp-signalr -g planning-poker --sku Free_F1
``` 




