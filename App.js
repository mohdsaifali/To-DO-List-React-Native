import {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, ScrollView, Modal} from 'react-native';

const App = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(undefined);
  const getApiData = async () => {
    const url = 'http://10.0.2.2:3000/users';
    let result = await fetch(url);
    result = await result.json();
    // console.warn(result);

    if (result) {
      setData(result);
    }
  };

  const deleteData = async id => {
    const url = 'http://10.0.2.2:3000/users';
    let result = await fetch(`${url}/${id}`, {
      method: 'DELETE',
    });
    result = await result.json();
    // console.warn(result);

    if (result) {
      console.warn('User deleted');
      getApiData();
    }
  };

  const UpdateUser = data => {
    setShowModal(true);
    setSelectedUser(data);
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <>
      <View>
        <Text style={Styles.textBox}>List With Update API Data</Text>
      </View>

      <View style={Styles.wrapper}>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 20, fontWaigth: 'bold', color: '#fff'}}>
            ID
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 20, fontWaigth: 'bold', color: '#fff'}}>
            Name
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 20, fontWaigth: 'bold', color: '#fff'}}>
            Email
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 20, fontWaigth: 'bold', color: '#fff'}}>
            Opretions
          </Text>
        </View>
      </View>

      <ScrollView>
        <View style={Styles.listItem}>
          {data.length
            ? data.map(item => (
                <View style={Styles.wrapper}>
                  <View style={{flex: 1}}>
                    <Text
                      style={{fontSize: 18, fontWaigth: 'bold', color: 'blue'}}>
                      {item.id}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{fontSize: 18, fontWaigth: 'bold', color: 'blue'}}>
                      {item.name}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{fontSize: 18, fontWaigth: 'bold', color: 'blue'}}>
                      {item.email}
                    </Text>
                  </View>

                  <View style={{flex: 1, margin: 2, marginTop: 10}}>
                    <Button
                      title="Delete"
                      color="red"
                      onPress={() => deleteData(item.id)}
                    />
                  </View>
                  <View style={{flex: 1, marginTop: 10, margin: 2}}>
                    <Button
                      title="Update"
                      color="green"
                      onPress={() => UpdateUser(item)}
                    />
                  </View>
                </View>
              ))
            : null}
          <Modal visible={showModal} transparent={true}>
            <UpdateModal setShowModal={setShowModal} selectedUser={selectedUser}  />
          </Modal>
        </View>
      </ScrollView>
    </>
  );
};

const UpdateModal = props => {
  return (
    <View style={Styles.centerModal}>
      <View style={Styles.modalView}>
        <Text>{props.selectedUser.name}</Text>
        <Button title="close" onPress={() => props.setShowModal(false)} />
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  textBox: {
    fontSize: 25,
    padding: 10,
    color: '#fff',
    backgroundColor: (180, 120, 150),
    margin: 10,
    textAlign: 'center',
    borderColor: 'green',
    borderWidth: 5,
    borderRadius: 20,
  },
  listItem: {
    flex: 1,
  },

  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'skyblue',
    margin: 5,
    padding: 8,
    fontSize: 12,
    borderColor: 'grey',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    borderRadius: 10,
  },
  centerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 60,
    alignItems: 'center',
    shadowColor: '#000',
    shadowRadius: 10,
  },
});

export default App;
