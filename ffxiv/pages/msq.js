function Msq({ data }) {
    return <h1>{data.Character.Name}</h1>;
}

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(process.env.FFXIV_API_URL + '/character/8728612')
    const data = await res.json()

    // Pass data to the page via props
    return { props: { data } }
}

export default Msq;