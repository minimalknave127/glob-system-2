import axios from "axios";

export const getCompany = (ico) => {



    const instance = axios.create({
        baseURL: "",
        withCredentials: false,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    })

    axios.get("https://wwwinfo.mfcr.cz/cgi-bin/ares/darv_bas.cgi?ico=" + ico, instance)
        .then(res => {
            // console.log(res.data);
            const parser = new DOMParser();
            let doc;
            doc = parser.parseFromString(res.data, 'text/html');
            const x = doc.getElementsByTagName("D:VBAS");
            if (x[0] === undefined) {
                return (
                    alert("IČO nebylo nalezeno")
                    //         setLoading(false)
                )

            }
            //alert(x[0].getElementsByTagName("Identifikace").childNodes[0].nodeValue);

            const name = (x[0].getElementsByTagName("d:of")[0].childNodes[0].nodeValue);
            console.log(x[0]);

            return name
            //props.setData({ name: name, ico: ico })
            //setLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
}