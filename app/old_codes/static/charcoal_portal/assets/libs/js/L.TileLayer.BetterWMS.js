



function tableToJson(table) { 
            var table = table
            var jsonString = { Rows: [] };
            var $th = $(table).find('th');
            $(table).find('tbody tr').each(function (i, tr) {
                if (i > 0) {
                    var obj = {};
                    $tds = $(tr).find('td');
                    $th.each(function (index, th) {
                        obj[$(th).text()] = $tds.eq(index).text();
                    });
                    jsonString.Rows.push(obj);
                }
            });
            return(JSON.stringify(jsonString));
        }


L.TileLayer.BetterWMS = L.TileLayer.WMS.extend({

    onAdd: function(map) {
        // Triggered when the layer is added to a map.
        //   Register a click listener, then do all the upstream WMS things
        L.TileLayer.WMS.prototype.onAdd.call(this, map);
        map.on('click', this.getFeatureInfo, this);
    },

    onRemove: function(map) {
        // Triggered when the layer is removed from a map.
        //   Unregister a click listener, then do all the upstream WMS things
        L.TileLayer.WMS.prototype.onRemove.call(this, map);
        map.off('click', this.getFeatureInfo, this);
    },

    getFeatureInfo: function(evt) {
        // Make an AJAX request to the server and hope for the best
        var url = this.getFeatureInfoUrl(evt.latlng),
            showResults = L.Util.bind(this.showGetFeatureInfo, this);
        $.ajax({
            url: url,
            success: function(data, status, xhr) {
                var err = typeof data === 'string' ? null : data;

               // console.log(data)
               // console.log(data)

                showResults(err, evt.latlng, data);
            },
            error: function(xhr, status, error) {
                showResults(error);
            }
        });
    },

    getFeatureInfoUrl: function(latlng) {
        // Construct a GetFeatureInfo request URL given a point
        var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
            size = this._map.getSize(),

            params = {
                request: 'GetFeatureInfo',
                service: 'WMS',
                srs: 'EPSG:4326',
                styles: this.wmsParams.styles,
                transparent: this.wmsParams.transparent,
                version: this.wmsParams.version,
                format: this.wmsParams.format,
                bbox: this._map.getBounds().toBBoxString(),
                height: size.y,
                width: size.x,
                layers: this.wmsParams.layers,
                query_layers: this.wmsParams.layers,
                info_format: 'text/html'
            };

        params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
        params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;

        // return this._url + L.Util.getParamString(params, this._url, true);

        var url = this._url + L.Util.getParamString(params, this._url, true);


        /**
         * CORS workaround (using a basic php proxy)
         * 
         * Added 2 new options:
         *  - proxy
         *  - proxyParamName
         * 
         */

        // check if "proxy" option is defined (PS: path and file name)
        if (typeof this.wmsParams.proxy !== "undefined") {

            // check if proxyParamName is defined (instead, use default value)
            if (typeof this.wmsParams.proxyParamName !== "undefined")
                this.wmsParams.proxyParamName = 'url';

            // build proxy (es: "proxy.php?url=" )
            _proxy = this.wmsParams.proxy + '?' + this.wmsParams.proxyParamName + '=';

            url = _proxy + encodeURIComponent(url);

        }

        return url;

    },

    showGetFeatureInfo: function(err, latlng, content) {
        if (err) { console.log(err); return; } // do nothing if there's an error


            // console.log(content)

            // console.log("content")

       var tbl = JSON.parse(tableToJson(content))
      // console.log(tbl)
       labeltoshow = '<table class="table table-bordered table-striped custab" style="color:black">'
       //labeltoshow += "<thead><tr style='background-color:;color:white;'><th colspan='2'> <b><center> Attribute Table</center></b></th></tr></thead>"
        labeltoshow += "<tbody>"
       $.each(tbl["Rows"][0], function(index2, value2) {
             labeltoshow += "<tr><td><b> " + index2 +  "  </b></td><td> " + value2 +  " </td><tr>"
                
        }); 

          labeltoshow += "</tbody></table>"


     // labeltoshow ='<table class="table table-striped table-bordered custab">'
             
     //   $.each(tbl["Rows"][0], function(index2, value2) {
     //         labeltoshow += "<tr><td><b> " + index2 +  "  </b></td><td> " + value2 +  " </td><tr>"
                
     //    });          
             
                
     // labeltoshow ='</table>'


      $("#attribute").html(labeltoshow)
        
        $( "#dialog-2" ).dialog( "open" );
        //        $("#berryDialog2").fadeIn(999);
        //         // alert("on");
                // pop2 = 'on'




        // // Otherwise show the content in a popup, or something.
        // L.popup({ maxWidth: 800 })
        //     .setLatLng(latlng)
        //     .setContent(labeltoshow)
        //     .openOn(this._map);
    }
});

L.tileLayer.betterWms = function(url, options) {
    return new L.TileLayer.BetterWMS(url, options);
};