function Msq({ data }) {
    //return <div><h1>{data.Character.Name}</h1><div>{JSON.stringify(data.Character)}</div></div>;
    return <p>{JSON.stringify(data)}</p>
}

async function xxivRequest() {
    const res = await fetch (process.env.FFXIV_API_URL + '/search?page=2', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "indexes": "quest",
            "columns": "ID,Name",
            "body": {
            }
        })
    })

    const result = await res.json()

    return result;
}

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const data = await xxivRequest()

    // Pass data to the page via props
    return { props: { data } }
}

export default Msq;