import "./App.css";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useState, useEffect } from "react";

const GET_SAILORS = gql`
    query GetSailors {
        getSailors {
            name
        }
    }
`;

const ADD_SAILOR = gql`
    mutation AddSailor($addSailorInput: addSailor) {
        addSailor(addSailorInput: $addSailorInput) {
            name
        }
    }
`;

function AddSailor() {
    const [data, setData] = useState({
        name: "",
    });

    const [addSailor, { loading, error }] = useMutation(ADD_SAILOR, {
        onError(error) {
            console.log(error.message);
        },
    });

    if (loading) return "Submitting...";
    if (error) return `Submission error ! ${error.message}`;

    return (
        <form
            className="new-member-form"
            onSubmit={(e) => {
                e.preventDefault();
                addSailor({ variables: { addSailorInput: data } });
            }}
        >
            <label>Nom de l&apos;Argonaute</label>
            <input
                value={data.name}
                id="name"
                name="name"
                placeholder="Entrez ici le nom du mouss"
                onChange={(e) => {
                    setData({
                        ...data,
                        name: e.target.value,
                    });
                }}
            />
            <button type="submit">Ajouter le matelot</button>
        </form>
    );
}

function App() {
    const { loading, error, data } = useQuery(GET_SAILORS, {
        pollInterval: 500,
    });

    return (
        <div className="App">
            {/* Header section */}
            <header>
                <h1>
                    <img
                        src="https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png"
                        alt="Wild Code School logo"
                    />
                    Les Argonautes
                </h1>
            </header>

            {/* <!-- Main section --> */}
            <main>
                {/* <!-- New member form --> */}
                <h2>Ajouter un(e) Argonaute</h2>
                <AddSailor />

                {/* <!-- Member list --> */}
                <h2>Membres de l'équipage</h2>
                <section className="member-list">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error.message}</p>
                    ) : (
                        // <div>
                        <>
                            {data.getSailors.map((sailor) => {
                                return (
                                    <div
                                        className="member-item"
                                        // key={sailor._id}
                                    >
                                        {sailor.name}
                                    </div>
                                );
                            })}
                        </>
                        // {/* </div> */}
                    )}
                </section>
            </main>

            <footer>
                <p>Réalisé par Arthur sur la Terre de l'an 2023</p>
            </footer>
        </div>
    );
}

export default App;
