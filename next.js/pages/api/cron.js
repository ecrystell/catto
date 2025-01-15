export default async function handler(req, res) {
    if (req.method == "POST") {
        const chatid = "@cattobotto";
        const apiUrl = 'https://api.thecatapi.com/v1/images/search?size=small&format=json&limit=1';
        var url = '';
        // Make a GET request
        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Data not found');
            } else if (response.status === 500) {
                throw new Error('Server error');
            } else {
                throw new Error('Network response was not ok');
            }
            }
            return response.json();
        })
        .then(data => {
            console.log(data[0]['url']);
            url = data[0]['url'];
        })
        .catch(error => {
            console.error('Error:', error);
        });

        if (url != '') {
            await sendPhoto(chatid, url, " ");
            res.status(200).send("OK");
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(500).send('Method Not Allowed');
    }

}