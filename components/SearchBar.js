<View style={{ display: "flex", flexDirection: "row" }}>
  <Text>Search:</Text>
  <TextInput
    style={{
      flex: 2,
      borderWidth: 1,
      borderColor: "black",
      borderStyle: "solid",
    }}
    defaultValue=""
    title="search"
    onChange={(text) => this.handlePress(text)}
    value={this.state.searchTerm}
  />
  <Button onPress={this.handleClear} title="clear" />
</View>;
