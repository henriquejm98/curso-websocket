import { Dispatch, SetStateAction } from "react";
import { Topic } from "./Home";
import React from "react";

type TopicListProps = {
    topics: Topic[]
    setTopics: Dispatch<SetStateAction<Topic[]>>
    setOpenTopic: Dispatch<SetStateAction<Topic | null>>
}

export default function TopicsList({ topics, setTopics, setOpenTopic }: TopicListProps) {
    async function deleteTopic(id: string) {
        await fetch(`http://localhost:3000/topics/${id}`, { method: "DELETE" })
        const updatedTopics = topics.filter(t => t._id !== id)
        setTopics(updatedTopics)
    }
    return (
        <main id="topics">
            {topics.length === 0
            ? <h3>Parece que não tem nada aqui...</h3>
            : topics.map(topic => (
                <div className="topic">
                    <h2>{topic.title}</h2>
                    <div>
                        <button onClick={() => setOpenTopic(topic)}>Entrar na sala</button>
                        <button onClick={() => deleteTopic(topic._id)}>Excluir</button>
                    </div>
                </div>
            ))}
        </main>
    )
}