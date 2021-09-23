import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import InputText from '../../components/InputText';
import Layout from '../../components/Layout';
import SingleButton from '../../components/SingleButton';
import IconCarousel from '../../components/IconCarousel';

import { styles } from './styles';
import { WishSchema } from '../../validations/FormSchemas';
import { getWishById, insertWish, updateWish } from '../../dataAccess/Wish';
import { Wish } from '../../models/Wish';

const NuevoDeseo = ({ navigation, route }) => {
  const methods = useForm({
    defaultValues: { ...route.params },
    resolver: yupResolver(WishSchema),
  });

  const { handleSubmit, reset } = methods;

  // Insert wish
  const onSubmitNew = async (data) => {
    const { icon, name, value } = data;
    await insertWish(new Wish(name, value, icon)); // por defecto le pone el user 1 y que no esta cumplido
    reset();
    navigation.navigate('MyWishes');
  };

  // Edit Wish
  const onSubmitEdit = async (data) => {
    const { icon, name, value } = data;
    const wishViejo = await getWishById(route.params.wishId);
    wishViejo.icon = icon;
    wishViejo.name = name;
    wishViejo.value = value;
    void (await updateWish(wishViejo)); // por defecto le pone el user 1 y que no esta cumplido
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
            onPress={
              route.params === undefined
                ? handleSubmit(onSubmitNew)
                : handleSubmit(onSubmitEdit)
            }
          />
        </FormProvider>
      </ScrollView>
    </Layout>
  );
};

export default NuevoDeseo;
