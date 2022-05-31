function Msq({ data }) {
    //return <div><h1>{data.Character.Name}</h1><div>{JSON.stringify(data.Character)}</div></div>;
    return <b>{JSON.stringify(data)}</b>
}

async function xxivRequest() {
    const XIVAPI = require('@xivapi/js')
    const xiv = new XIVAPI()
    let res

    try {
        res = await xiv.search({
            "indexes": "quest",
            "columns": "ID,Name",
            "page": 2,
            "body": {}
        }, {
            private_key: process.env.FFXIV_API_KEY_V
        })
    } catch (e) {
        // TODO: How should xivapi errors be logged? Customer logger module? Another package?
        console.error(`${process.env.FFXIV_API_URL} request error`, e)
    }

    return res;
}

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const data = await xxivRequest()

    // Pass data to the page via props
    return { props: { data } }
}

export default Msq;