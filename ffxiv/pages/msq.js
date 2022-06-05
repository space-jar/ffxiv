function Msq({ data }) {
    return (
        <ul>
            {data.Results.map(quest => <li key={quest.ID}><h2>{quest.Name}</h2><p>{JSON.stringify(quest)}</p></li>)}
        </ul>
    )
}

async function xxivRequest() {
    const XIVAPI = require('@xivapi/js')
    const xiv = new XIVAPI({
        private_key: process.env.FFXIV_API_KEY_V,
        verbose: 1
    })
    let res

    try {
        res = await xiv.search({
            page: 1,
        }, {
            indexes: 'Quest',
            columns: ['ID', 'Name', 'Icon', 'ClassJobCategory0.ID', 'ClassJobLevel0', 'ClassJobRequired.Abbreviation', 'GameContentLinks', 'JournalGenre.JournalCategory.JournalSection.Name', 'PlaceName.Name']
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