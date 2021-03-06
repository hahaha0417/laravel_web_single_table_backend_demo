<?php

namespace DoctrineProxies\__CG__\entities\front;

/**
 * DO NOT EDIT THIS FILE - IT WAS CREATED BY DOCTRINE'S PROXY GENERATOR
 */
class Products extends \entities\front\Products implements \Doctrine\ORM\Proxy\Proxy
{
    /**
     * @var \Closure the callback responsible for loading properties in the proxy object. This callback is called with
     *      three parameters, being respectively the proxy object to be initialized, the method that triggered the
     *      initialization process and an array of ordered parameters that were passed to that method.
     *
     * @see \Doctrine\Common\Proxy\Proxy::__setInitializer
     */
    public $__initializer__;

    /**
     * @var \Closure the callback responsible of loading properties that need to be copied in the cloned object
     *
     * @see \Doctrine\Common\Proxy\Proxy::__setCloner
     */
    public $__cloner__;

    /**
     * @var boolean flag indicating if this object was already initialized
     *
     * @see \Doctrine\Common\Persistence\Proxy::__isInitialized
     */
    public $__isInitialized__ = false;

    /**
     * @var array<string, null> properties to be lazy loaded, indexed by property name
     */
    public static $lazyPropertiesNames = array (
);

    /**
     * @var array<string, mixed> default values of properties to be lazy loaded, with keys being the property names
     *
     * @see \Doctrine\Common\Proxy\Proxy::__getLazyProperties
     */
    public static $lazyPropertiesDefaults = array (
);



    public function __construct(?\Closure $initializer = null, ?\Closure $cloner = null)
    {

        $this->__initializer__ = $initializer;
        $this->__cloner__      = $cloner;
    }







    /**
     * 
     * @return array
     */
    public function __sleep()
    {
        if ($this->__isInitialized__) {
            return ['__isInitialized__', '' . "\0" . 'entities\\front\\Products' . "\0" . 'id', '' . "\0" . 'entities\\front\\Products' . "\0" . 'type', '' . "\0" . 'entities\\front\\Products' . "\0" . 'name', '' . "\0" . 'entities\\front\\Products' . "\0" . 'description', '' . "\0" . 'entities\\front\\Products' . "\0" . 'comment', '' . "\0" . 'entities\\front\\Products' . "\0" . 'image', '' . "\0" . 'entities\\front\\Products' . "\0" . 'url', '' . "\0" . 'entities\\front\\Products' . "\0" . 'showStartTime', '' . "\0" . 'entities\\front\\Products' . "\0" . 'showEndTime', '' . "\0" . 'entities\\front\\Products' . "\0" . 'saleStartTime', '' . "\0" . 'entities\\front\\Products' . "\0" . 'saleEndTime', '' . "\0" . 'entities\\front\\Products' . "\0" . 'status', '' . "\0" . 'entities\\front\\Products' . "\0" . 'createdAt', '' . "\0" . 'entities\\front\\Products' . "\0" . 'updatedAt'];
        }

        return ['__isInitialized__', '' . "\0" . 'entities\\front\\Products' . "\0" . 'id', '' . "\0" . 'entities\\front\\Products' . "\0" . 'type', '' . "\0" . 'entities\\front\\Products' . "\0" . 'name', '' . "\0" . 'entities\\front\\Products' . "\0" . 'description', '' . "\0" . 'entities\\front\\Products' . "\0" . 'comment', '' . "\0" . 'entities\\front\\Products' . "\0" . 'image', '' . "\0" . 'entities\\front\\Products' . "\0" . 'url', '' . "\0" . 'entities\\front\\Products' . "\0" . 'showStartTime', '' . "\0" . 'entities\\front\\Products' . "\0" . 'showEndTime', '' . "\0" . 'entities\\front\\Products' . "\0" . 'saleStartTime', '' . "\0" . 'entities\\front\\Products' . "\0" . 'saleEndTime', '' . "\0" . 'entities\\front\\Products' . "\0" . 'status', '' . "\0" . 'entities\\front\\Products' . "\0" . 'createdAt', '' . "\0" . 'entities\\front\\Products' . "\0" . 'updatedAt'];
    }

    /**
     * 
     */
    public function __wakeup()
    {
        if ( ! $this->__isInitialized__) {
            $this->__initializer__ = function (Products $proxy) {
                $proxy->__setInitializer(null);
                $proxy->__setCloner(null);

                $existingProperties = get_object_vars($proxy);

                foreach ($proxy::$lazyPropertiesDefaults as $property => $defaultValue) {
                    if ( ! array_key_exists($property, $existingProperties)) {
                        $proxy->$property = $defaultValue;
                    }
                }
            };

        }
    }

    /**
     * 
     */
    public function __clone()
    {
        $this->__cloner__ && $this->__cloner__->__invoke($this, '__clone', []);
    }

    /**
     * Forces initialization of the proxy
     */
    public function __load()
    {
        $this->__initializer__ && $this->__initializer__->__invoke($this, '__load', []);
    }

    /**
     * {@inheritDoc}
     * @internal generated method: use only when explicitly handling proxy specific loading logic
     */
    public function __isInitialized()
    {
        return $this->__isInitialized__;
    }

    /**
     * {@inheritDoc}
     * @internal generated method: use only when explicitly handling proxy specific loading logic
     */
    public function __setInitialized($initialized)
    {
        $this->__isInitialized__ = $initialized;
    }

    /**
     * {@inheritDoc}
     * @internal generated method: use only when explicitly handling proxy specific loading logic
     */
    public function __setInitializer(\Closure $initializer = null)
    {
        $this->__initializer__ = $initializer;
    }

    /**
     * {@inheritDoc}
     * @internal generated method: use only when explicitly handling proxy specific loading logic
     */
    public function __getInitializer()
    {
        return $this->__initializer__;
    }

    /**
     * {@inheritDoc}
     * @internal generated method: use only when explicitly handling proxy specific loading logic
     */
    public function __setCloner(\Closure $cloner = null)
    {
        $this->__cloner__ = $cloner;
    }

    /**
     * {@inheritDoc}
     * @internal generated method: use only when explicitly handling proxy specific cloning logic
     */
    public function __getCloner()
    {
        return $this->__cloner__;
    }

    /**
     * {@inheritDoc}
     * @internal generated method: use only when explicitly handling proxy specific loading logic
     * @deprecated no longer in use - generated code now relies on internal components rather than generated public API
     * @static
     */
    public function __getLazyProperties()
    {
        return self::$lazyPropertiesDefaults;
    }

    
    /**
     * {@inheritDoc}
     */
    public function getId()
    {
        if ($this->__isInitialized__ === false) {
            return  parent::getId();
        }


        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getId', []);

        return parent::getId();
    }

    /**
     * {@inheritDoc}
     */
    public function setType($type)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setType', [$type]);

        return parent::setType($type);
    }

    /**
     * {@inheritDoc}
     */
    public function getType()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getType', []);

        return parent::getType();
    }

    /**
     * {@inheritDoc}
     */
    public function setName($name)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setName', [$name]);

        return parent::setName($name);
    }

    /**
     * {@inheritDoc}
     */
    public function getName()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getName', []);

        return parent::getName();
    }

    /**
     * {@inheritDoc}
     */
    public function setDescription($description = NULL)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setDescription', [$description]);

        return parent::setDescription($description);
    }

    /**
     * {@inheritDoc}
     */
    public function getDescription()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getDescription', []);

        return parent::getDescription();
    }

    /**
     * {@inheritDoc}
     */
    public function setComment($comment = NULL)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setComment', [$comment]);

        return parent::setComment($comment);
    }

    /**
     * {@inheritDoc}
     */
    public function getComment()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getComment', []);

        return parent::getComment();
    }

    /**
     * {@inheritDoc}
     */
    public function setImage($image = NULL)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setImage', [$image]);

        return parent::setImage($image);
    }

    /**
     * {@inheritDoc}
     */
    public function getImage()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getImage', []);

        return parent::getImage();
    }

    /**
     * {@inheritDoc}
     */
    public function setUrl($url = NULL)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setUrl', [$url]);

        return parent::setUrl($url);
    }

    /**
     * {@inheritDoc}
     */
    public function getUrl()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getUrl', []);

        return parent::getUrl();
    }

    /**
     * {@inheritDoc}
     */
    public function setShowStartTime($showStartTime = NULL)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setShowStartTime', [$showStartTime]);

        return parent::setShowStartTime($showStartTime);
    }

    /**
     * {@inheritDoc}
     */
    public function getShowStartTime()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getShowStartTime', []);

        return parent::getShowStartTime();
    }

    /**
     * {@inheritDoc}
     */
    public function setShowEndTime($showEndTime = NULL)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setShowEndTime', [$showEndTime]);

        return parent::setShowEndTime($showEndTime);
    }

    /**
     * {@inheritDoc}
     */
    public function getShowEndTime()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getShowEndTime', []);

        return parent::getShowEndTime();
    }

    /**
     * {@inheritDoc}
     */
    public function setSaleStartTime($saleStartTime = NULL)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setSaleStartTime', [$saleStartTime]);

        return parent::setSaleStartTime($saleStartTime);
    }

    /**
     * {@inheritDoc}
     */
    public function getSaleStartTime()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getSaleStartTime', []);

        return parent::getSaleStartTime();
    }

    /**
     * {@inheritDoc}
     */
    public function setSaleEndTime($saleEndTime = NULL)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setSaleEndTime', [$saleEndTime]);

        return parent::setSaleEndTime($saleEndTime);
    }

    /**
     * {@inheritDoc}
     */
    public function getSaleEndTime()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getSaleEndTime', []);

        return parent::getSaleEndTime();
    }

    /**
     * {@inheritDoc}
     */
    public function setStatus($status)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setStatus', [$status]);

        return parent::setStatus($status);
    }

    /**
     * {@inheritDoc}
     */
    public function getStatus()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getStatus', []);

        return parent::getStatus();
    }

    /**
     * {@inheritDoc}
     */
    public function setCreatedAt($createdAt = NULL)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setCreatedAt', [$createdAt]);

        return parent::setCreatedAt($createdAt);
    }

    /**
     * {@inheritDoc}
     */
    public function getCreatedAt()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getCreatedAt', []);

        return parent::getCreatedAt();
    }

    /**
     * {@inheritDoc}
     */
    public function setUpdatedAt($updatedAt = NULL)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setUpdatedAt', [$updatedAt]);

        return parent::setUpdatedAt($updatedAt);
    }

    /**
     * {@inheritDoc}
     */
    public function getUpdatedAt()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getUpdatedAt', []);

        return parent::getUpdatedAt();
    }

}
