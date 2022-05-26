import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import { MdAdd, MdPlaylistAdd } from 'react-icons/md';
import TodoItem from './TodoItem';
import Footer from './Footer';

export default function Form() {
    const localStorageData = JSON.parse(localStorage.getItem("todo"));
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState(localStorageData == null ? [] : localStorageData);
    const [pendingTask, setPendingTask] = useState((todos.filter((item) => { return !item.isDone; })).length);
    const [id, setId] = useState(todos.length > 0 ? todos[todos.length - 1].id + 1 : 0);

    function handleClick() {
        if (input.length === 0) {
            alert("Sorry, Please type some text!")
        }
        else if (input.length <= 30) {
            setTodos((prevValue) => {
                const newItem = { id: id, title: input, isDone: false };
                const updatedList = [...prevValue, newItem];
                localStorage.setItem("todo", JSON.stringify(updatedList));
                setId((prevId) => {
                    return prevId + 1;
                });
                return updatedList;
            })
            setInput("");
            setPendingTask((prevValue) => {
                return prevValue + 1;
            });
        }
        else {
            alert("Text length is greater than 30, make it small!")
        }
    }

    function handleChange(event) {
        const value = event.target.value;
        setInput(value);
    }

    function handleDelete(id) {
        let currTaskIsDone = 0;
        setTodos((prevValue) => {
            const updatedList = prevValue.filter((todoItem) => {
                if (todoItem.id === id && todoItem.isDone === false) {
                    currTaskIsDone = 1;
                }
                return id !== todoItem.id;
            });
            localStorage.setItem("todo", JSON.stringify(updatedList));
            return updatedList;
        })

        setPendingTask((prevPendingTasks) => {
            return prevPendingTasks - currTaskIsDone;
        })
    }

    function clearAll() {
        setTodos([]);
        localStorage.setItem("todo", JSON.stringify([]));
        setPendingTask(0);
    }

    return (
        <>
            <div className="form">
                <Input onChange={handleChange} value={input} />
                <Button
                    onClick={handleClick}
                    icon={MdAdd}
                    title=""
                    style={{
                        backgroundColor: "#F47C7C",
                        color: "rgb(216, 52, 52)",
                        borderColor: "rgb(216, 52, 52)",
                        borderTopRightRadius: "5px",
                        borderBottomRightRadius: "5px"
                    }}
                    hover={"#fff"}
                />
            </div>
            <div className="todos-container">
                {todos.length === 0 ? <MdPlaylistAdd style={{ alignSelf: "center", marginTop: "90px" }} size="250" color="rgba(173, 77, 77, 0.3)" /> : null}
                {
                    todos.map((item) => {
                        return <TodoItem
                            key={item.id}
                            itemProperties={item}
                            setTodos={setTodos}
                            setPendingTask={setPendingTask}
                            onClick={() => handleDelete(item.id)}
                            style={{ backgroundColor: "#f74c4c" }}
                        />
                    })
                }
            </div>
            <Footer
                onClick={clearAll}
                pendingTask={pendingTask}
            />
        </>
    )
};
