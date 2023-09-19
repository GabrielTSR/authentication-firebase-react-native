import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as GoogleSignIn from 'expo-google-sign-in';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { authentication, firebase } from "./firebase/config";
import { useRef, useState } from "react";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>('');

  const inputRef = useRef();
  const passwordRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);

    signInWithEmailAndPassword(authentication, email, password)
      .then((res) => {
        console.log("successful");
      })

      .catch((err) => {
        console.log(err);
        setError("Incorrect Email/Password");
      })

      .finally(() => setIsLoading(false));
  };

  const handleSignInWithGoogle = async () => {
    setIsGoogleLoading(true);

    try {
      await GoogleSignIn.initAsync({
        clientId: '784082060967-h5a46tdli7gebms3lrueon6qp50gahru.apps.googleusercontent.com', // O clientId do OAuth para o Google
      });

      const { type, user } = await GoogleSignIn.signInAsync();

      if (type === 'success') {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          user.auth.idToken,
          user.auth.accessToken
        );

        await firebase.auth().signInWithCredential(credential);
        console.log('Usuário autenticado:', firebase.auth().currentUser);
      }
    } catch (error) {
      console.error('Erro ao autenticar com o Google:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome!</Text>
      <Image
        source={{
          uri: "https://ouch-cdn2.icons8.com/teMbWzQG6l5J7CQqv4TiWL2pvjv9-A1IUmfuhymu3zw/rs:fit:608:456/extend:false/wm:1:re:0:0:0.8/wmid:ouch/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMzIy/LzEzODJjMmMwLThj/M2YtNGQ4Yy1iODk0/LWRkYTRhMDI3ZGFl/OS5zdmc.png",
        }}
        style={styles.logo}
      />

      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#003f5c"
        value={email}
        onChangeText={(email) => setEmail(email)}
      />

      <TextInput
        ref={passwordRef}
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#003f5c"
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      

      <TouchableOpacity onPress={handleSignIn} style={styles.button}>
        <Text style={styles.loginText}>Login</Text>
        {isLoading && (
          <ActivityIndicator
            size="small"
            color="white"
            style={{
              alignSelf: "center",
              justifyContent: "center",
              paddingLeft: 10,
            }}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignInWithGoogle} style={styles.button}>
        <Text style={styles.loginText}>Google</Text>
        {isGoogleLoading && (
          <ActivityIndicator
            size="small"
            color="white"
            style={{
              alignSelf: "center",
              justifyContent: "center",
              paddingLeft: 10,
            }}
          />
        )}
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text style={styles.downText}>Don't have an account?</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
  },
  button: {
    backgroundColor: "#302298",
    borderRadius: 20,
    padding: 10,
    margin: 14,
    width: "78%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    alignSelf: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  downText: {
    color: "#331ece",
    fontSize: 16,
    fontWeight: "400",
    marginTop: 10,
  },
  signup: {
    alignSelf: "flex-start",
    textDecorationLine: "underline",
    color: "#331ece",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 5,
    marginTop: 10,
  },
});

export default App;