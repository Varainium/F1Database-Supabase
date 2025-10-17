# Formula 1 Data API
## Overview
This project is an API to querying F1 data such as circuits, constructors, drivers, and races.

## Built with
Node.Js - JS Runtime \
Express - Routing \
Render - To deploy the API's.


## API Endpoints

| API Endpoint                               | Description                                                                    |
| -------------------------------------------| :----------------------------------------------------------------------------- |
| /api/circuits                              | Returns all the circuits                                                       |
| /api/circuits/ref                          | Returns just the specified circuit                                             |
| /api/circuits/season/year                  | Returns the circuits used in a given season                                    |
| /api/constructors                          | Returns all the constructors                                                   |
| /api/constructors/ref                      | Returns just the specified constructor                                         |
| /api/drivers                               | Returns all the drivers                                                        |
| /api/drivers/ref                           | Returns just the specified driver                                              |
| /api/drivers/search/substring              | Returns the drivers whose surname                                              |
| /api/drivers/race/raceId                   | Returns the drivers within a given race                                        |
| /api/races/raceId                          | Returns just the specified race.                                               |
| /api/races/season/year                     | Returns the races within a given season ordered by round                       |
| /api/races/season/year/round               | Returns a specific race within a given season specified by the round number    |
| api/races/circuits/ref                     | Returns all the races for a given circuit                                      |
| /api/races/circuits/ref/season/start/end   | Returns all the races for a given circuit between two years                    |
| /api/results/raceId                        | Returns the results for the specified race                                     |
| /api/results/drivers/ref                   | Returns all the results for a given driver                                     |
| /api/results/drivers/ref/seasons/start/end | Returns all the results for a given driver between two years                   |
| /api/qualifying/raceId                     | Returns the qualifying results for the specified race                          |
| /api/standings/drivers/raceId              | Returns the current season driver standings table for the specified race       |
| /api/standings/constructors/raceId         | Returns the current season constructors standings table for the specified race |

## API Test Links
|                                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------------------------------------|
| [/api/circuits](https://f1database-supabase.onrender.com/api/circuits)        
| [/api/circuits/monaco](https://f1database-supabase.onrender.com/api/circuits/monaco) 
| [/api/circuits/season/2020](https://f1database-supabase.onrender.com/api/circuits/season/2020)
| [/api/constructors/](https://f1database-supabase.onrender.com/api/constructors/)
| [/api/constructors/mclaren](https://f1database-supabase.onrender.com/api/constructors/mclaren)
| [/api/drivers](https://f1database-supabase.onrender.com/api/drivers)
| [/api/drivers/hamilton](https://f1database-supabase.onrender.com/api/drivers/hamilton)
| [/api/drivers/search/sch](https://f1database-supabase.onrender.com/api/drivers/search/sch)
| [/api/drivers/race/10](https://f1database-supabase.onrender.com/api/drivers/race/10)
| [/api/races/10](https://f1database-supabase.onrender.com/api/races/10)
| [/api/races/season/2020](https://f1database-supabase.onrender.com/api/races/season/2020)
| [/api/races/season/2020/4](https://f1database-supabase.onrender.com/api/races/season/2020/4)
| [/races/circuits/monza](https://f1database-supabase.onrender.com/api/races/circuits/monza)
| [/api/races/circuits/monza/season/2015/2020](https://f1database-supabase.onrender.com/api/races/circuits/monza/season/2015/2020)
| [/api/results/10](https://f1database-supabase.onrender.com/api/results/10)
| [/api/results/drivers/hamilton](https://f1database-supabase.onrender.com/api/results/drivers/hamilton)
| [/api/results/drivers/hamilton/seasons/2008/2010](https://f1database-supabase.onrender.com/api/results/drivers/hamilton/seasons/2008/2010)
| [/api/qualifying/10](https://f1database-supabase.onrender.com/api/qualifying/10)
| [/api/standings/drivers/10](https://f1database-supabase.onrender.com/api/standings/drivers/10)
| [/api/standings/constructors/10](https://f1database-supabase.onrender.com/api/standings/constructors/10)