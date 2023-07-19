# Quick Start
+ Install Dependencies

    ````npm i justin-gauge````

+ Guide package

    ````import {GaugeChart} from 'justin-gauge';````
+ Use component
    ````
    <wc-gauge style="width: 500px;"
          data='{
              "data": [13, 17, 8, 10, 40, 24],
              "value": 40
            }'
          options='{
              "cutout": "90%",
              "theme": "qualitative-colors-tertiary"
            }'
          label='[1, 2, 3, 4, 5, 6]'
          ></wc-gauge>
    ````


