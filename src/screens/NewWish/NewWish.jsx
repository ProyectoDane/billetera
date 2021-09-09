import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import InputText from '../../components/InputText';
import Layout from '../../components/Layout';
import SingleButton from '../../components/SingleButton';
import { styles } from './styles';
import { WishSchema } from '../../validations/FormSchemas';
import IconCarousel from '../../components/IconCarousel';

const NuevoDeseo = ({ navigation, route }) => {
  const methods = useForm({
    defaultValues: { ...route.params },
    resolver: yupResolver(WishSchema),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    console.log(data);
    reset();
    navigation.navigate('MyWishes');
  };

  return (
    <Layout>
      <ScrollView>
        <Text style={styles.title}>AGREGAR ICONO</Text>
        <FormProvider {...methods}>
          <View style={styles.form}>
            <IconCarousel />
            <InputText
              name="name"
              label="NOMBRE"
              placeholder="INGRESE EL NOMBRE DEL DESEO"
              required
            />
            <InputText
              name="value"
              label="VALOR"
              keyboardType="numeric"
              placeholder="INGRESE EL VALOR DEL DESEO"
              required
            />
          </View>
          <SingleButton
            icon="magic"
            sizeIcon={22}
            label="CREAR DESEO"
            onPress={handleSubmit(onSubmit)}
          />
        </FormProvider>
      </ScrollView>
    </Layout>
  );
};

export default NuevoDeseo;
