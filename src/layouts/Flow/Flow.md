## The Flow System

Flow is a layout system which is intended to capture the rules which have surfaced in various UX mockups into tested, repeatable code. With Flow, each UI element is annotated with an optional label and help text component. Vertical spacing is kept consistent on every row. Horizontal alignment has sane defaults and a lot of options for fine-tuning. Flow is primarily designed for use inside forms to layout inputs, but it can be used anywhere you need it.

### Recognizing a Flow.Item

Flow Items have a distinctive layout and appearance. When you see one in a design mockup, use the Flow system.

![A Flow Item](../images/flow/item.png)

Flow Items have a label, help text, and content which has a fixed height. Sometimes they might be missing a label, or help text, or both. As a rule of thumb, though, anything which is on the same horizontal level as another Flow Item should also be a Flow Item.

### Flow Recipes

#### Simple Row

![Simple Recipe](../images/flow/simpleRecipe.png)

```
<Flow>
  <Flow.Item label="User ID:" helpText={userIdHelpText}>
    <Input value={userId} disabled />
  </Flow.Item>
  <Flow.Item label="API Token and Secret:" helpText={apiHelpText}>
    <Button>Show Token and Secret</Button>
  </Flow.Item>
</Flow>
```

#### Precise Field Alignment

Sometimes you need to use nesting to achieve a precise alignment of various rows of fields. Particularly, if you want to break one column down into two columns on a certain row, you need to use nesting to line them up prefectly.

![Alignment Recipe](../images/flow/alignmentRecipe.png)

(Item contents omitted for brevity)

```
<Flow>
  <Flow.Row>
    <Flow.Item label="Company" />
    <Flow.Item label="Address" />
  </Flow.Row>
  <Flow.Row>
    <Flow.Item label="City" />
    <Flow.Row>
      <Flow.Item label="State" />
      <Flow.Item label="Zip" />
    </Flow.Row>
  </Flow.Row>
</Flow>
```

#### Redux Form

Flow includes built-in Redux Form fields for all our Input types. Reference them from \`Flow.fields\`. These components will take care of all transformations necessary for Redux Form Field usage.

![Form Recipe](../images/flow/formRecipe.png)

```
// in a redux-form HOC
<Form onSubmit={this.props.handleSubmit}>
  <Flow>
    <Flow.Row>
      <Field
        name="name"
        label="Application name:"
        required
        component={Flow.fields.Input}
      />
      <Field
        name="id"
        label="Application ID:"
        disabled
        placeholder="We create this for you"
        component={Flow.fields.Input}
      />
    </Flow.Row>
    <Flow.Row>
      <Field
        name="callbackRequestMethod"
        label="Callback request method:"
        required
        options={['POST', 'GET']}
        component={Flow.fields.RadioGroup}
      />
      <Field
        name="type"
        label="Application type:"
        required
        options={['MESSAGING', 'VOICE', 'BOTH']}
        component={Flow.fields.RadioGroup}
      />
    </Flow.Row>
  </Flow>
</Form>
```

#### Form Controls

Usually in a form, submit buttons and other controls lay out differently. There are a variety of possibilities, but all are possible with Flow! Here are some examples:

![Left Recipe](../images/flow/leftRecipe.png)

```
<Flow>
  <Flow.Row alignment="left">
    <Flow.Item>
      <Button>Update</Button>
    </Flow.Item>
    <Flow.Item>
      <Anchor>Cancel</Anchor>
    </Flow.Item>
  </Flow.Row>
</Flow>
```

![Spaced Recipe](../images/flow/spacedRecipe.png)

```
<Flow>
  <Flow.Row>
    <Flow.Item alignment="left">
      <Anchor>Show optional fields</Anchor>
    </Flow.Item>
    <Flow.Row alignment="right">
      <Flow.Item>
        <Anchor>Cancel</Anchor>
      </Flow.Item>
      <Flow.Item>
        <Button disabled>Create</Button>
      </Flow.Item>
    </Flow.Row>
  </Flow.Row>
</Flow>
```