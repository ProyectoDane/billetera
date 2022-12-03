import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import InputText from '../../components/InputText';
import Layout from '../../components/Layout';
import SingleButton from '../../components/SingleButton';
import IconCarousel from '../../components/IconCarousel';

import {styles} from './styles';
import {WishSchema} from '../../validations/FormSchemas';
import {getWishById, insertWish, updateWish} from '../../dataAccess/Wish';
import {Wish} from '../../models/Wish';
import {colors, NAVIGATION_TITLE } from '../../constants';
import {toastNotification} from '../../utils/functions/toastNotifcation';
import {useCarousel} from '../../components/IconCarousel/hooks/useCarousel';
import {whishesList} from '../../mockData/deseos';
import { useKeyboard } from '../../utils/hooks/useKeyboard';
import { ScrollView } from 'react-native-gesture-handler';

const icons = whishesList.map(({ icon, name }) => ({ icon, name }));

const NuevoDeseo = ({ navigation, route }) => {
  const scrollRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const { item, nextStep, prevStep } = useCarousel(icons);
  const {keyboardHeight, keyboardShown} = useKeyboard();
  const isKeyboardAnnoying = keyboardShown && keyboardHeight > 190 && keyboardHeight < 290;

  const methods = useForm({
    defaultValues: { ...route.params },
    resolver: yupResolver(WishSchema),
  });
  const { handleSubmit, reset, setValue } = methods;

  useEffect(() => {
    setValue('name', item.name);
  }, [item.name]);

  useEffect(() =>{
    if (isKeyboardAnnoying) {
      scrollRef.current.scrollTo({ x: 0, y: 230, animated: true });
    }
  }, [isKeyboardAnnoying])

  // Insert wish
  const onSubmitNew = async (data) => {
    setIsLoading(true);
    const { name, value } = data;
    try {
      await insertWish(new Wish(name, value, item.icon));
      reset();
      setIsLoading(false);
      toastNotification('✓ EL DESEO SE CREÓ CORRECTAMENTE!', null, 'success');
      navigation.navigate(NAVIGATION_TITLE.WISHES);
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
      navigation.navigate(NAVIGATION_TITLE.WISHES);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  console.log("asdasd", keyboardHeight);
  return (
    <Layout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{...styles.newWishContainer}}>
        <View style={{          
          flexBasis: 400,
          flexGrow: 1,
        }}>
          <ScrollView ref={scrollRef} contentContainerStyle={{paddingBottom: isKeyboardAnnoying ? 100 : 0}}>
            <View style={styles.card}>
              <Text style={styles.title}>ELEGIR ICONO</Text>
              <FormProvider {...methods}>
                <View style={styles.form}>
                  <IconCarousel icon={item.icon} onPrevStep={prevStep} onNextStep={nextStep} />
                  <InputText name="name" label="NOMBRE" placeholder="INGRESE EL NOMBRE DEL DESEO" required />
                  <InputText
                    name="value"
                    label="VALOR"
                    keyboardType={"numeric"}
                    placeholder="INGRESE EL VALOR DEL DESEO"
                    required
                  />
                </View>
              </FormProvider>
            </View>
          </ScrollView>
        </View>        
        <View style={styles.bottomButtonContainer}>
          <View>
              <SingleButton
                // icon="magic"
                // sizeIcon={22}
                style={{  width: "100%", marginBottom: 10 }}
                label={route.params === undefined ? 'AGREGAR DESEO' : 'EDITAR DESEO'}
                isLoading={isLoading}
                disabled={isLoading}
                onPress={route.params === undefined ? handleSubmit(onSubmitNew) : handleSubmit(onSubmitEdit)}
              />
            <SingleButton
                // icon="magic"
                // sizeIcon={22}
                style={{  width: "100%", backgroundColor: colors.white, borderWidth: 2,
                  borderColor: colors.primary, color: colors.primary }}
                label={"CANCELAR"}
                isLoading={isLoading}
                disabled={isLoading}
                onPress={navigation.goBack}
              />
          </View>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </Layout>
  );
};

export default NuevoDeseo;
