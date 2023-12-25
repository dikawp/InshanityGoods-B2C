import { WebView } from "react-native-webview";
import { View, Spinner } from "native-base";

const DisplaySnap = ({route}) => {
    const {url} = route.params;
  return (
    <>
      {url ? (
        <WebView source={{ uri: url }} />
      ) : (
        <View>
          <Spinner size={"lg"} />
        </View>
      )}
    </>
  );
};

export default DisplaySnap;
