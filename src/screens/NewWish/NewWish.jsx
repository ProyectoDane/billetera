import React, { useEffect, useState } from 'react';
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
import { SCREEN_NAME } from '../../constants';
import { toastNotification } from '../../utils/functions/toastNotifcation';
import { useCarousel } from '../../components/IconCarousel/hooks/useCarousel';
import { whishesList } from '../../mockData/deseos';

const icons = whishesList.map(({ icon, name }) => ({ icon, name }));

const NuevoDeseo = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { item, nextStep, prevStep } = useCarousel(icons);

  const methods = useForm({
    defaultValues: { ...route.params },
    resolver: yupResolver(WishSchema),
  });
  const { handleSubmit, reset, setValue } = methods;

  useEffect(() => {
    setValue('name', item.name);
  }, [item.name]);

  // Insert wish
  const onSubmitNew = async (data) => {
    setIsLoading(true);
    const { name, value } = data;
    try {
      await insertWish(new Wish(name, value, item.icon));
      reset();
      setIsLoading(false);
      toastNotification('✓ EL DESEO SE CREÓ CORRECTAMENTE!', null, 'success');
      navigation.navigate(SCREEN_NAME.MY_WISHES);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // Edit Wish
  const onSubmitEdit = async (data) => {
    setIsLoading(true);
    const { icon, name, value } = data;
    try {
      const id = route.params.wishId;
      await getWishById(id);
      void (await updateWish({ id, icon, name, value }));
      reset();
      setIsLoading(false);
      toastNotification('✓ EL DESEO SE EDITÓ CORRECTAMENTE!', null, 'success');
      navigation.navigate(SCREEN_NAME.MY_WISHES);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <ScrollView>
        <Text style={styles.title}>AGREGAR ICONO</Text>
        <FormProvider {...methods}>
          <View style={styles.form}>
            <IconCarousel icon={item.icon} onPrevStep={prevStep} onNextStep={nextStep} />
            <InputText name="name" label="NOMBRE" placeholder="INGRESE EL NOMBRE DEL DESEO" required />
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
            style={{ marginTop: 20 }}
            label={route.params === undefined ? 'CREAR DESEO' : 'EDITAR DESEO'}
            isLoading={isLoading}
            disabled={isLoading}
            onPress={route.params === undefined ? handleSubmit(onSubmitNew) : handleSubmit(onSubmitEdit)}
          />
        </FormProvider>
      </ScrollView>
    </Layout>
  );
};

export default NuevoDeseo;
