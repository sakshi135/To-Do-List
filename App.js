import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import Task from "./components/Task.js";

export default function App() {
  const [text, setText] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [task, setTask] = useState();
  const [filteredArray, setFilteredArray] = useState(taskItems);
  const handleAddTask = () => {
    setTaskItems([...taskItems, task]);
    setFilteredArray([...taskItems, task]);
    setTask(null);
  };
  const deleteTask = (index) => {
    let copyTask = [...taskItems];
    copyTask.splice(index, 1);
    setTaskItems(copyTask);
    setFilteredArray(copyTask);
  };
  const Filtered = (searchText) => {
    setTask(searchText);
    let filterArray = taskItems.filter((i) =>
      i.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredArray(filterArray);
  };
  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Shopping List</Text>
        <View style={styles.writeTaskWrapper}>
          <TextInput
            style={styles.input}
            placeholder={"write a task"}
            value={task}
            onChangeText={(text) => Filtered(text)}
          />
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.items}>
          {filteredArray.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => deleteTask(index)}>
                <Task text={item} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: { paddingTop: 80, paddingHorizontal: 20 },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 80,
  },
  writeTaskWrapper: {
    position: "absolute",
    paddingTop: 120,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: 60,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
});
